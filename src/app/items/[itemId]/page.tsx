"use client";

import { TENANT_ID } from "@/app/constants/tenant_id";
import CheckListDetail from "@/components/CheckListDetail";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const { itemId } = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [memo, setMemo] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const originalData = useRef({
    name: "",
    isCompleted: false,
    memo: "",
  });

  const isModified =
    originalData.current.name !== name ||
    originalData.current.isCompleted !== isCompleted ||
    originalData.current.memo !== memo ||
    file !== null;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickEdit = async () => {
    const confirm = window.confirm("수정하시겠습니까?");
    let imageUrl;

    if (!confirm) {
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/images/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      imageUrl = data.url;
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        memo,
        imageUrl,
        isCompleted,
      }),
    });

    location.reload();
  };

  const handleClickDelete = async () => {
    const confirm = window.confirm("삭제하시겠습니까?");

    if (!confirm) {
      return;
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${id}`, {
      method: "DELETE",
    });

    router.push("/");
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드할 수 있습니다.");
        return;
      }

      if (!/^[a-zA-Z0-9_.-]+$/.test(file.name)) {
        alert("파일 이름은 영어만 가능합니다.");
        return;
      }

      setFile(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${TENANT_ID}/items/${itemId}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      setId(data.id);
      setName(data.name);
      setIsCompleted(data.isCompleted);
      setMemo(data.memo || "");
      setImagePreview(data.imageUrl);
      setIsLoading(false);

      originalData.current = {
        name: data.name,
        isCompleted: data.isCompleted,
        memo: data.memo || "",
      };
    };

    fetchData();
  }, [itemId]);

  useEffect(() => {
    const blobUrl = file ? URL.createObjectURL(file) : null;

    if (blobUrl) {
      setImagePreview(blobUrl);
    }

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [file]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 bg-white h-full p-4 sm:p-6 sm:gap-6 lg:px-32">
      <CheckListDetail
        name={name}
        setName={setName}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
      />

      <div className="grid lg:grid-cols-[2fr_3fr] sm:gap-6 gap-4">
        <input
          ref={fileInputRef}
          accept="image/*"
          type="file"
          onChange={handleChangeFile}
          hidden
        />

        {imagePreview ? (
          <div className="relative rounded-2xl h-[311px] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={imagePreview}
              alt="preview"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-full bg-slate-900/50 border-slate-900 border-2 absolute right-4 bottom-4 cursor-pointer"
            >
              <img
                className="absolute left-1/2 top-1/2 -translate-1/2"
                src="/btn/edit.svg"
                alt="edit"
              />
            </button>
          </div>
        ) : (
          <div className="relative border-2 border-dashed rounded-2xl h-[311px] bg-slate-50 border-slate-300">
            <img
              className="absolute left-1/2 top-1/2 -translate-1/2"
              src="/ic/img.svg"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-full bg-slate-200 absolute right-4 bottom-4 cursor-pointer"
            >
              <img
                className="absolute left-1/2 top-1/2 -translate-1/2"
                src="/btn/plus.svg"
                alt="plus"
              />
            </button>
          </div>
        )}

        <div className="rounded-2xl h-[311px] flex flex-col items-center justify-center overflow-hidden py-6 px-4 gap-4 bg-[url(/img/memo.svg)] bg-center">
          <div className="text-amber-800 font-bold">Memo</div>
          <textarea
            className="w-full h-full text-center outline-none resize-none"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요"
          />
        </div>
      </div>

      <div className="flex gap-4 lg:justify-end justify-center">
        <EditButton onClick={handleClickEdit} disabled={!isModified} />

        <DeleteButton onClick={handleClickDelete} />
      </div>
    </div>
  );
}

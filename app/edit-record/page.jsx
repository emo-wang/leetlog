"use client";

import { useSession } from 'next-auth/react'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { formatDate } from "@utils/formatDate";

const CreateRecord = () => {
  const router = useRouter();
  const { data: session } = useSession()
  const [submitting, setsubmitting] = useState(false);
  const [record, setRecord] = useState(
    { title: "", difficulty: 0, priority: 0, status: "Best Solution", attempts: 0, dates: formatDate(new Date()), notes: '' }
  )

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/record/new', {
        method: 'POST',
        body: JSON.stringify({
          ...record,
          userId: session?.user.id,
          dates: new Date(record.dates).getTime(),
          attempts: record.status !== "Unsolved" ? 1 : 0
        })
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false)
    }
  }

  useEffect(() => {

  }, []);

  return (
    <Form
      type='Edit'
      record={record}
      setRecord={setRecord}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateRecord;
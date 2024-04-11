"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { formatDate } from "@utils/formatDate";

const CreateRecord = () => {
  const router = useRouter();
  const { data: session } = useSession()
  const [submitting, setsubmitting] = useState(false);
  const [record, setRecord] = useState(
    { title: "", difficulty: 0, priority: 0, status: 2, attempts: [2], dates: formatDate(new Date()), notes: '' }
  )

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/record/new', {
        method: 'POST',
        body: JSON.stringify({
          ...record,
          userId: session?.user.id,
          dates: [record.dates],
          attempts: [record.status]
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
      type='Create'
      record={record}
      setRecord={setRecord}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateRecord;
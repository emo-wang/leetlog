"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { formatDate } from "@utils/formatDate";

const EditRecord = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const recordId = searchParams.get("id");

    const [submitting, setSubmitting] = useState(false);
    const [record, setRecord] = useState({ title: "", difficulty: 0, priority: 0, status: 2, attempts: [2], dates: [formatDate(new Date())], notes: '' })

    useEffect(() => {
        const getRecordDetails = async () => {
            const response = await fetch(`/api/record/${recordId}`);
            const data = await response.json();
            setRecord(data);
        };

        if (recordId) getRecordDetails();
    }, [recordId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!recordId) return alert("Missing RecordId!");

        try {
            const response = await fetch(`/api/record/${recordId}`, {
                method: "PATCH",
                body: JSON.stringify(record),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

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

export default EditRecord;
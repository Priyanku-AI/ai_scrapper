"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const [taskId, setTaskId] = useState(null);

  // POST create task
  const createTask = useMutation({
    mutationFn: async ({ url, question }) => {
      const res = await fetch("http://localhost:5000/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, question }),
      });
      return res.json();
    },
    onSuccess: (data) => {
      setTaskId(data.id);
    },
  });

  // Poll task status
  const { data: taskData } = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/task/${taskId}`);
      return res.json();
    },
    enabled: !!taskId,
    refetchInterval: 2000, // poll every 2 secs
  });

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1>Praśna.AI</h1>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const url = e.target.url.value;
          const question = e.target.question.value;

          createTask.mutate({ url, question });
        }}
      >
        <input name="url" placeholder="Enter website URL" required />
        <br />
        <textarea
          name="question"
          placeholder="Ask a question about the website"
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {/* Task Status */}
      {taskId && (
        <div style={{ marginTop: "30px" }}>
          <h3>Task Status</h3>
          <p>Status: {taskData?.status}</p>

          {taskData?.status === "completed" && (
            <>
              <h3>Reveal</h3>
              <p>{taskData.answer}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

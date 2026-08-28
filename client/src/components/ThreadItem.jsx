import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateThread,
  deleteThread,
} from "../services/threads.service";

function ThreadItem({ thread }) {
  const [title, setTitle] = useState(thread.title);
  const [editing, setEditing] = useState(false);

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: ({ id, data }) => updateThread(id, data),

    onSuccess: (updated, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      queryClient.invalidateQueries({ queryKey: ["thread", id] });

      setEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteThread,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });

  if (editing) {
    return (
      <li>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          disabled={editMutation.isPending}
          onClick={() =>
            editMutation.mutate({
              id: thread.id,
              data: { title },
            })
          }
        >
          {editMutation.isPending ? "Saving..." : "Save"}
        </button>
      </li>
    );
  }

  return (
    <li>
      <span>{thread.title}</span>

      <button onClick={() => setEditing(true)}>
        Edit
      </button>

      <button
        disabled={deleteMutation.isPending}
        onClick={() => deleteMutation.mutate(thread.id)}
      >
        {deleteMutation.isPending ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
}

export default ThreadItem;
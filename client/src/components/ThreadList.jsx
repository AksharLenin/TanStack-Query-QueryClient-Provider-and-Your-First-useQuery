import { useQuery } from "@tanstack/react-query";
import { getThreads } from "../services/threads.service";

function ThreadList() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["threads"],
    queryFn: getThreads,
  });

  if (isPending) {
    return <p>Loading threads...</p>;
  }

  if (isError) {
    return <p>Error loading threads: {error.message}</p>;
  }

  return (
    <div>
      <h2>Threads</h2>
      {data.map((thread) => (
        <div key={thread.id}>
          <h3>{thread.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default ThreadList;
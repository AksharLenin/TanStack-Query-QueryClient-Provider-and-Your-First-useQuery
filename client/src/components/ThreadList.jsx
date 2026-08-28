// ───────────────────────────────────────────────────────────── 
// TODO (2/2): Replace this hand-rolled fetching with TanStack Query. 
// 
// Requirements (the auto-grader checks these): 
//   • import { useQuery } from "@tanstack/react-query" 
//   • Remove ALL useState and useEffect used for data fetching. 
//   • Call: useQuery({ queryKey: ["threads"], queryFn: getThreads }) 
//       - pass the function REFERENCE getThreads, NOT getThreads() 
//   • Render three states: 
//       - a loading indicator while isPending is true 
//       - an error message while isError is true 
//       - one list item per thread when data is available 
// 
// Example shape: 
//   const { data, isPending, isError, error } = useQuery({ 
//     queryKey: ["threads"], 
//     queryFn: getThreads, 
//   }); 
//   if (isPending) return <p>Loading…</p>; 
//   if (isError)   return <p>Error: {error.message}</p>; 
//   return <ul>{data.map((t) => <li key={t.id}>{t.title}</li>)}</ul>; 
// ───────────────────────────────────────────────────────────── 

import { useQuery } from "@tanstack/react-query"; 
import { getThreads } from "../services/threads.service"; 
 
export default function ThreadList() { 
  const { data, isPending, isError, error } = useQuery({ 
    queryKey: ["threads"], 
    queryFn: getThreads, 
  }); 
 
  if (isPending) return <p>Loading threads…</p>; 
  if (isError) return <p className="err">Error: {error.message}</p>; 
 
  return ( 
    <ul className="threads"> 
      {data.map((t) => ( 
        <li className="card" key={t.id}> 
          <h3>{t.title}</h3> 
          <p>{t.body}</p> 
        </li> 
      ))} 
    </ul> 
  ); 
}
// interface Params {
//     id: string;
//   }
  
//   export default function UserProfile({ params }: { params: Params }) {
//     const userid = params.id; // No await needed
  
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
//         <h1 className="text-xl">Profile Page</h1>
//         <hr />
//         <div className="flex flex-col justify-center items-start gap-2">
//           <p className="text-4xl">
//             user profile: <span className="bg-orange-500 text-zinc-900">{userid}</span>
//           </p>
//         </div>
//       </div>
//     );
//   }
export default function UserProfile({ params }: { params: { id: string } }) {
    return null; // or <></> if you prefer
  }
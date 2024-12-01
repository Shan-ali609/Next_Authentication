
// // "use client";
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import Link from "next/link";

// // export default function VerifyEmail() {
// //   const [token, setToken] = useState("");
// //   const [verified, setVerified] = useState(false);
// //   const [error, setError] = useState(false);

// //   const VerifyEmail = async () => {
// //     try {
// //       await axios.post("/api/users/verifyemail", { token });
// //       setVerified(true);
// //       setError(false)
// //     } catch (error:any) {
// //       setError(true);
// //       console.log(error.response?.message || "Unknown error occurred");
// //     }
// //   };

// //   useEffect(() => {
// //     setError(false)
// //     const urlToken = window.location.search.split("=")[1];
// //     setToken(urlToken || "");
// //   }, []);

// //   useEffect(() => {
// //     setError(false)
// //     if (token.length > 0) {
// //       VerifyEmail();
// //     }
// //   }, [token]);

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen py-2">
// //       <h1 className="text-4xl">Verify Email</h1>
// //       <h1 className="text-2xl bg-orange-700 p-3">{token ? `${token}` : "No token"}</h1>
// //       {verified && (
// //         <div>
// //           <h1>User Verified</h1>
// //           <Link href="/login">Login</Link>
// //         </div>
// //       )}
// //       {error && (
// //         <div>
// //           <h1>Error</h1>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client"
// import React, { useEffect, useState } from "react";
// import axios from "axios"; // Import AxiosError
// import Link from "next/link";

// export default function VerifyEmail() {
//   const [token, setToken] = useState<string | null>(null);
//   const [verified, setVerified] = useState(false);
//   const [error, setError] = useState<string | null>(null); // More descriptive error state

//   const VerifyEmail = async () => {
//     if (!token) {
//       return;
//     }

//     try {
//       await axios.post("/api/users/verifyemail", { token });
//       setVerified(true);
//       setError(null); // Clear previous errors on success
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) { // Type guard for AxiosError
//         setVerified(false);
//         setError(err.response?.data?.message || "Unknown error occurred");
//       } else {
//         setVerified(false);
//         setError("An unexpected error occurred.");
//       }
//     }
//   };

//   useEffect(() => {
//     const urlToken = new URLSearchParams(window.location.search).get("token"); // Safer token extraction
//     if (urlToken) {
//       setToken(urlToken);
//     } else {
//       setError("Token not found in the URL");
//     }
//   });

//   useEffect(() => {
//     if (token) {
//       VerifyEmail(); // Only verify once the token is set
//     }
//   }, [token]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1 className="text-4xl">Verify Email</h1>
//       <h1 className="text-2xl bg-orange-700 p-3">{token ? token : "No token"}</h1>
      
//       {verified && (
//         <div>
//           <h1>User Verified</h1>
//           <Link href="/login">Login</Link>
//         </div>
//       )}
      
//       {error && (
//         <div>
//           <h1>Error: {error}</h1>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmail() {
  const [token, setToken] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize VerifyEmail to prevent it from being re-created on each render
  const VerifyEmail = useCallback(async () => {
    if (!token) {
      return;
    }

    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setVerified(false);
        setError(err.response?.data?.message || "Unknown error occurred");
      } else {
        setVerified(false);
        setError("An unexpected error occurred.");
      }
    }
  }, [token]); // Add token as a dependency to memoize the function correctly

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      setToken(urlToken);
    } else {
      setError("Token not found in the URL");
    }
  }, []); // Run only once on mount

  useEffect(() => {
    if (token) {
      VerifyEmail(); // Verify email once token is set
    }
  }, [token, VerifyEmail]); // Add VerifyEmail to the dependency array

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h1 className="text-2xl bg-orange-700 p-3">{token ? token : "No token"}</h1>
      
      {verified && (
        <div>
          <h1>User Verified</h1>
          <Link href="/login">Login</Link>
        </div>
      )}
      
      {error && (
        <div>
          <h1>Error: {error}</h1>
        </div>
      )}
    </div>
  );
}

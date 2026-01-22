import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Account() {
  const { user } = useAuth();

  if (!user) {
  return <p className="text-center">Login хийнэ үү</p>;
}

return (
  <div className="max-w-xl mx-auto">
    <h1 className="text-xl font-bold">Account</h1>
    <p>Email: {user.email}</p>
  </div>
)}

export default Account;

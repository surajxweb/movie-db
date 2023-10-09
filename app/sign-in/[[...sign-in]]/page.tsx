"use client";
import React from "react";
import { SignIn } from "@clerk/nextjs";
import styles from "./Clerk.module.css";

const LoginPage = () => {
  return (
    <>
      <div className={styles.container}>
        <SignIn />
      </div>
    </>
  );
};

export default LoginPage;

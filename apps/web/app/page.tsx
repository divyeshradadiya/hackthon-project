import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";
// import { useUser } from '@clerk/clerk-react';

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  // const { user, isSignedIn, isLoaded } = useUser();
  // const {isSignedIn} = useAuth() // Replace with actual sign-in check
  return (
    <div className={styles.page}>
      <main className={styles.main}></main>
    </div>
  );
}

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Poker from "../src/Components/Poker";
import { ToastContainer, toast } from 'react-toastify';
import {useEffect, useState} from "react";
import useSocket from "../src/hooks";

function Home() {
  const [status, setStatus] = useState(true);
  const socket = useSocket()

  useEffect(() => {
    function handleEvent(payload) {
      toast.success(payload);
    }
    if (socket) {
      socket.on('vote', handleEvent)
      socket.on('close', () => {
        toast.info("Voting is closed")
        setStatus(false);
      })
    }
  }, [socket])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Avalon team Scrum poker" />
        <link rel="icon" href="/logo.png" />
      </Head>


      <main className={styles.main}>
        <Image
          src={"/logo.png"}
          alt={"Avalon logo"}
          width={"150"}
          height={"150"}
        />
        <Poker status={status}/>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>

    </div>
  )
}


export default Home
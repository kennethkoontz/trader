import { useState } from "react";
import Modal from "react-modal";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import useTrader from "../components/useTrader";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

export default function Home() {
  const { assets, selected, setSelected, amount, setAmount } = useTrader();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const afterOpenModal = () => {};

  const selectAsset = (asset) => {
    setSelected(asset);
    closeModal();
  };

  const buy = () => {
    const resolveAfter3Sec = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        setAmount("");
      }, 2000);
    });
    toast.promise(
      resolveAfter3Sec,
      {
        pending: "Purchasing...",
        success: `Purchased $${amount} ${selected.name}! 🎉`,
      },
      {
        theme: "dark",
        position: "bottom-right",
      }
    );
  };

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(33, 36, 41, 0.75)",
    },
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(33, 36, 41)",
      border: "1px solid rgb(44, 47, 54)",
      borderRadius: "20px",
      width: "100%",
      maxWidth: "480px",
      padding: 0,
      color: "white",
    },
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Drypto — DCA</title>
        <meta name="description" content="Dollar cost average the easy way." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <ToastContainer />
        <div className={styles.title}>
          <h1>Drypto</h1>
        </div>
        <div className={styles.trader}>
          <div className={styles.heading}>Buy</div>
          <div className={styles.selector}>
            <div className={styles.assetWrapper}>
              <button
                className={styles.asset}
                onClick={() => setModalIsOpen(true)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.imageURL}
                  alt={selected.name}
                  height={20}
                  width={20}
                />
                <span className={styles.assetText}>{selected.short}</span>
                <span className={styles.caret}>
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sc-33m4yg-8 kcdsjA"
                  >
                    <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE" />
                  </svg>
                </span>
              </button>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Buy"
              >
                <div className={styles.modalBody}>
                  <div className={styles.modalHeader}>
                    <h3>Select asset</h3>
                    <button className={styles.close} onClick={closeModal}>
                      X
                    </button>
                  </div>
                  {/*<input*/}
                  {/*  ref={inputEl}*/}
                  {/*  className={styles.assetSelector}*/}
                  {/*  placeholder="Search name"*/}
                  {/*/>*/}
                </div>
                <div className={styles.assetList}>
                  {assets.map((o) => (
                    <div
                      key={o.short}
                      className={styles.assetClass}
                      onClick={() => selectAsset(o)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={o.imageURL}
                        alt={o.name}
                        height={40}
                        width={40}
                      />
                      <div className={styles.assetName}>
                        <div>{o.short}</div>
                        <div>{o.name}</div>
                      </div>
                      <div>${o.price}</div>
                    </div>
                  ))}
                </div>
              </Modal>
              <input
                className={styles.amount}
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                placeholder="0"
              />
            </div>
            <button className={styles.buy} onClick={buy} disabled={amount <= 0}>
              Buy
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

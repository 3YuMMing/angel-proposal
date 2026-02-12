import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function ProposalSite() {
    const [stage, setStage] = useState("valentine");
    const [noClicks, setNoClicks] = useState(0);
    const [intro, setIntro] = useState(true);
    const audioRef = useRef(null);

    const noMessages = [
        "Are you suuuure?PIGGER",
        "Really really sure?CHIGGER",
        "Think again… chigga",
        "Last chance… pigga",
        "Okay that button is broken 😌",
    ];

    function handleNo() {
        setNoClicks((prev) => prev + 1);
    }

    useEffect(() => {
        if (stage === "accepted" && audioRef.current) {
            audioRef.current.play().catch(() => { });
        }
    }, [stage]);

    const hearts = Array.from({ length: 12 });

    if (stage === "accepted") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4 overflow-hidden">
                <audio ref={audioRef} loop src="/song-request.mp3" />
                <Confetti recycle={true} />

                {hearts.map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -50, x: Math.random() * 300 - 150, opacity: 0 }}
                        animate={{ y: 600, opacity: 1 }}
                        transition={{ duration: 4 + Math.random() * 2, repeat: Infinity }}
                        className="absolute text-2xl"
                    >
                        💖
                    </motion.div>
                ))}

                <motion.img
                    src="/dancing-cat.gif"
                    alt="Dancing cat"
                    className="w-40 h-40 object-contain"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                />

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                >
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                        <h1 className="text-3xl font-bold">
                            GOATED SHMOATED!!! 💖
                        </h1>
                        <p className="text-lg">IMA FART ON YOU ✨</p>
                        <p className="text-base">SAY WOOLI 💕</p>
                    </div>
                </motion.div>
            </div>
        );
    }

    const FloatingHearts = () => (
        <>
            {hearts.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -50, x: Math.random() * 300 - 150, opacity: 0 }}
                    animate={{ y: 600, opacity: 0.7 }}
                    transition={{ duration: 6 + Math.random() * 3, repeat: Infinity }}
                    className="absolute text-xl"
                >
                    💗
                </motion.div>
            ))}
        </>
    );

    const handleYes = () => {
        setNoClicks(0);

        if (stage === "valentine") {
            setStage("transition");
        } else if (stage === "transition") {
            setStage("girlfriend");
        } else {
            setStage("accepted");
        }
    };

    let content;

    // DRAMATIC INTRO
    if (intro) {
        content = (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-6"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold text-pink-600"
                >
                    I have one question for you…
                </motion.h1>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 text-lg bg-pink-500 text-white rounded-2xl shadow-lg"
                    onClick={() => setIntro(false)}
                >
                    What is it? 💕
                </motion.button>
            </motion.div>
        );
    }

    // UPDATED TRANSITION STAGE
    else if (stage === "transition") {
        content = (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-6 text-center"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl font-bold"
                >
                    WAIT WAIT… I have one more question for you…
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-lg text-pink-600 font-semibold"
                >
                    lemme hit you with that song request 🎶
                </motion.p>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-pink-500 text-white rounded-xl shadow-lg"
                    onClick={handleYes}
                >
                    Okay 💕
                </motion.button>
            </motion.div>
        );
    }

    else {
        const question =
            stage === "valentine"
                ? "Angel Chungas Sugar Mama Nguyen, will you be my Valentine?"
                : "Angel Chiglet Nguyen, will you be my girlfriend?";

        content = (
            <>
                <h1 className="text-2xl font-bold text-center">
                    {question}
                </h1>

                {noClicks > 0 && (
                    <p className="text-sm text-center">
                        {
                            noMessages[
                            Math.min(noClicks - 1, noMessages.length - 1)
                            ]
                        }
                    </p>
                )}

                <div className="flex gap-4 justify-center">
                    <button
                        className="px-6 py-2 text-base bg-pink-500 text-white rounded-xl"
                        onClick={handleYes}
                    >
                        Yes 💕
                    </button>

                    <motion.div
                        animate={{ x: noClicks * 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <button
                            className="px-6 py-2 text-base border rounded-xl"
                            onClick={handleNo}
                        >
                            No
                        </button>
                    </motion.div>
                </div>
            </>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4 overflow-hidden">
            <audio ref={audioRef} loop src="/song-request.mp3" />
            <FloatingHearts />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    {content}
                </div>
            </motion.div>
        </div>
    );
}

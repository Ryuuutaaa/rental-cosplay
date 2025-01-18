import { useState, useEffect } from "react";

function PaymentTimer({ deadline }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deadline));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(deadline));
        }, 1000);

        return () => clearInterval(timer);
    }, [deadline]);

    function calculateTimeLeft(deadline) {
        const diff = new Date(deadline) - new Date();
        if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

        return {
            hours: Math.floor(diff / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
        };
    }

    if (
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0
    ) {
        return (
            <p className="text-red-500 text-2xl">
                Waktu telah habis!
            </p>
        );
    }

    return (
        <p className="text-2xl">
            Sisa waktu : {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
        </p>
    );
}

export default PaymentTimer;

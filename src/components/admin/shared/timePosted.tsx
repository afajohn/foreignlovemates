"use client";
import type { FC } from "react";
import { useEffect, useState } from "react";

interface TimePostedProps {
    dateString: string;
}

const TimePosted: FC<TimePostedProps> = ({ dateString }) => {
    const [timePostedMessage, setTimePostedMessage] = useState<string>("");

    useEffect(() => {
        const calculateTimeDifference = () => {
            const postedDate = new Date(dateString);
            const currentDate = new Date();

            const timeDifference = currentDate.getTime() - postedDate.getTime();

            const secondsDifference = Math.floor(timeDifference / 1000);
            const minutesDifference = Math.floor(secondsDifference / 60);
            const hoursDifference = Math.floor(minutesDifference / 60);
            const daysDifference = Math.floor(hoursDifference / 24);

            if (daysDifference > 0) {
                return `${daysDifference} days ago`;
            }
            if (hoursDifference > 0) {
                return `${hoursDifference} hours ago`;
            }
            if (minutesDifference > 0) {
                return `${minutesDifference} minutes ago`;
            }
            return `${secondsDifference} seconds ago`;
        };

        setTimePostedMessage(calculateTimeDifference());
    }, [dateString]);

    return <>{timePostedMessage}</>;
};

export default TimePosted;
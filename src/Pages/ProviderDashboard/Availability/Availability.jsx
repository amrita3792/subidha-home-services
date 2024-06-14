import { useState } from 'react';


const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 20; hour++) {
        const hourStr = hour === 0 ? '12' : hour > 12 ? (hour - 12).toString().padStart(2, '0') : hour.toString().padStart(2, '0');
        const ampm = hour < 12 ? 'AM' : 'PM';
        times.push(`${hourStr}:00 ${ampm}`);
    }
    return times;
};

const timeOptions = generateTimeOptions();

const Availability = () => {
    const [allDays, setAllDays] = useState(false);
    const [allDayTimeSlot, setAllDayTimeSlot] = useState({ from: '', to: '' });
    const [timeSlots, setTimeSlots] = useState({
        Sunday: { enabled: false, from: '', to: '' },
        Monday: { enabled: false, from: '', to: '' },
        Tuesday: { enabled: false, from: '', to: '' },
        Wednesday: { enabled: false, from: '', to: '' },
        Thursday: { enabled: false, from: '', to: '' },
        Friday: { enabled: false, from: '', to: '' },
        Saturday: { enabled: false, from: '', to: '' },
    });

    const handleAllDaysChange = () => {
        setAllDays(!allDays);
        if (!allDays) {
            setTimeSlots(prevState => {
                const newState = { ...prevState };
                for (let day in newState) {
                    newState[day] = {
                        ...newState[day],
                        from: allDayTimeSlot.from,
                        to: allDayTimeSlot.to,
                        enabled: true,
                    };
                }
                return newState;
            });
        } else {
            setTimeSlots(prevState => {
                const newState = { ...prevState };
                for (let day in newState) {
                    newState[day] = {
                        ...newState[day],
                        enabled: false,
                    };
                }
                return newState;
            });
        }
    };

    const handleCheckboxChange = (day) => {
        setTimeSlots({
            ...timeSlots,
            [day]: {
                ...timeSlots[day],
                enabled: !timeSlots[day].enabled,
            },
        });
    };

    const handleTimeChange = (day, field, value) => {
        setTimeSlots({
            ...timeSlots,
            [day]: {
                ...timeSlots[day],
                [field]: value,
            },
        });
    };

    const handleAllDayTimeChange = (field, value) => {
        setAllDayTimeSlot({
            ...allDayTimeSlot,
            [field]: value,
        });
        if (allDays) {
            setTimeSlots(prevState => {
                const newState = { ...prevState };
                for (let day in newState) {
                    newState[day][field] = value;
                }
                return newState;
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedSlots = {};

        Object.keys(timeSlots).forEach(day => {
            if (timeSlots[day].enabled && timeSlots[day].from && timeSlots[day].to) {
                const fromHour = parseInt(timeSlots[day].from.split(':')[0], 10);
                const fromAmPm = timeSlots[day].from.split(' ')[1];
                const toHour = parseInt(timeSlots[day].to.split(':')[0], 10);
                const toAmPm = timeSlots[day].to.split(' ')[1];

                let startHour = fromAmPm === 'PM' && fromHour !== 12 ? fromHour + 12 : fromHour;
                startHour = fromAmPm === 'AM' && fromHour === 12 ? 0 : startHour;
                let endHour = toAmPm === 'PM' && toHour !== 12 ? toHour + 12 : toHour;
                endHour = toAmPm === 'AM' && toHour === 12 ? 0 : endHour;

                const slots = [];
                for (let hour = startHour; hour < endHour; hour++) {
                    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                    const nextHour = hour + 1 > 12 ? hour + 1 - 12 : hour + 1;
                    const amPm = hour >= 12 ? 'PM' : 'AM';
                    const nextAmPm = hour + 1 >= 12 ? 'PM' : 'AM';
                    slots.push(`${displayHour} - ${nextHour} ${amPm}`);
                }
                formattedSlots[day] = slots;
            }
        });

        // Example of saving to MongoDB, replace with your actual API call
        saveToMongoDB({ slots: formattedSlots });
    };

    const saveToMongoDB = (data) => {
        // Mock function to simulate saving to MongoDB
        console.log('Saving to MongoDB:', data);
        // Use an actual API call here to save to your backend
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={allDays}
                        onChange={handleAllDaysChange}
                    />
                    <span className="font-bold">All Days</span>
                </label>
                <div className="flex items-center space-x-2 mt-2 w-full">
                    <label className="flex flex-col basis-[50%]">
                        <span>From time:</span>
                        <select
                            className="select select-bordered"
                            value={allDayTimeSlot.from}
                            onChange={(e) => handleAllDayTimeChange('from', e.target.value)}
                        >
                            <option value="">Select Time</option>
                            {timeOptions.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="flex flex-col basis-[50%]">
                        <span>To time:</span>
                        <select
                            className="select select-bordered"
                            value={allDayTimeSlot.to}
                            onChange={(e) => handleAllDayTimeChange('to', e.target.value)}
                        >
                            <option value="">Select Time</option>
                            {timeOptions.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
            {Object.keys(timeSlots).map((day) => (
                <div key={day} className="mb-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={timeSlots[day].enabled}
                            onChange={() => handleCheckboxChange(day)}
                        />
                        <span className="font-bold">{day}</span>
                    </label>
                    {timeSlots[day].enabled && (
                        <div className="flex items-center space-x-2 mt-2 w-full">
                            <label className="flex flex-col basis-[50%]">
                                <span>From time:</span>
                                <select
                                    className="select select-bordered"
                                    value={timeSlots[day].from}
                                    onChange={(e) => handleTimeChange(day, 'from', e.target.value)}
                                >
                                    <option value="">Select Time</option>
                                    {timeOptions.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className="flex flex-col basis-[50%]">
                                <span>To time:</span>
                                <select
                                    className="select select-bordered"
                                    value={timeSlots[day].to}
                                    onChange={(e) => handleTimeChange(day, 'to', e.target.value)}
                                >
                                    <option value="">Select Time</option>
                                    {timeOptions.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    )}
                </div>
            ))}
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default Availability;

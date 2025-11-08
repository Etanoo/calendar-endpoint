export default function handler(req, res) {
    const dayName = (req.query.day || "wednesday").toLowerCase();
    const weekdays = {
        "sunday": 0, "monday": 1, "tuesday": 2,
        "wednesday": 3, "thursday": 4, "friday": 5, "saturday": 6
    };
    
    const weekday = weekdays[dayName];
    if (weekday === undefined) {
        return res.status(400).json({ error: "Ongeldige dag" });
    }

    const today = new Date();
    const diff = (weekday + 7 - today.getDay()) % 7 || 7;
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + diff);

    const isoDate = nextDate.toISOString().split('T')[0];
    res.status(200).json({ nextDate: isoDate });
}

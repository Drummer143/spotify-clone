import { useState } from "react";

export const useNumberFormatter = () => {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;

    const [formatter] = useState(new Intl.NumberFormat(locale));

    return formatter;
};

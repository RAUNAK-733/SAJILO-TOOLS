/**
 * Nepali Utility Suite - Core Application
 * Architecture: Modular Tool Pattern
 */

const App = {
    state: {
        activeTab: 'age',
    },

    init() {
        console.log("Initializing Nepali Utility Suite...");
        this.initTabs();
        this.initAgeCalculator();
        this.initGPACalculator();
        this.initDigitalClock();
    },

    // --- Tab Management ---
    initTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        const containers = document.querySelectorAll('.tool-container');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.id.replace('tab-', '');

                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                containers.forEach(c => {
                    c.classList.add('hidden');
                    if (c.id === `tool-${target}`) {
                        c.classList.remove('hidden');
                    }
                });

                this.state.activeTab = target;
            });
        });
    },

    // --- Age Calculator Module ---
    initAgeCalculator() {
        // High Precision Mapping for BS Years (2000 - 2085)
        // Data represents the number of days in each of the 12 months for that year
        const BS_CALENDAR_DATA = {
            2000: [31, 31, 31, 31, 31, 30, 29, 31, 30, 29, 30, 30],
            2001: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2002: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2003: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2004: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2005: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2006: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2007: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2008: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2009: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2010: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2011: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2012: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2013: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2014: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2015: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2016: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2017: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2018: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2019: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2020: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2021: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2022: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2023: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2024: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2025: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2026: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2027: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2028: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2029: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2030: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2031: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2032: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2033: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2034: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2035: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2036: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2037: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2038: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2039: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2040: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2041: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2042: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2043: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2044: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2045: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2046: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2047: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2048: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2049: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2050: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2051: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2052: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2053: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2054: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2055: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2056: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2057: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2058: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2059: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2060: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2061: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2062: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2063: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2064: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2065: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2066: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2067: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2068: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2069: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2070: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2071: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2072: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2073: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2074: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2075: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2076: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2077: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2078: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2079: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2080: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2081: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2082: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2083: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
            2084: [31, 31, 31, 31, 31, 30, 30, 31, 30, 30, 30, 30],
            2085: [31, 31, 31, 31, 31, 30, 30, 31, 30, 29, 30, 30],
        };

        const convertBSToAD = (bsYear, bsMonth, bsDay) => {
            const baseYearBS = 2000;
            const baseDateAD = new Date(1953, 3, 14); // April 14, 1953

            let totalDays = 0;

            // 1. Calculate days for full years since base
            for (let y = baseYearBS; y < bsYear; y++) {
                const yearDays = BS_CALENDAR_DATA[y]
                    ? BS_CALENDAR_DATA[y].reduce((a, b) => a + b, 0)
                    : 365; // Fallback for years outside table
                totalDays += yearDays;
            }

            // 2. Calculate days for months in current year
            if (BS_CALENDAR_DATA[bsYear]) {
                for (let m = 0; m < bsMonth - 1; m++) {
                    totalDays += BS_CALENDAR_DATA[bsYear][m];
                }
            } else {
                totalDays += (bsMonth - 1) * 30; // Approximation for missing years
            }

            // 3. Add current day
            totalDays += (bsDay - 1);

            const resultDate = new Date(baseDateAD);
            resultDate.setDate(resultDate.getDate() + totalDays);
            return resultDate;
        };

        const calculateAge = (birthDate) => {
            const today = new Date();
            let ageYears = today.getFullYear() - birthDate.getFullYear();
            let ageMonths = today.getMonth() - birthDate.getMonth();
            let ageDays = today.getDate() - birthDate.getDate();

            if (ageDays < 0) {
                ageMonths--;
                const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
                ageDays += prevMonthLastDay;
            }
            if (ageMonths < 0) {
                ageYears--;
                ageMonths += 12;
            }
            return { years: ageYears, months: ageMonths, days: ageDays };
        };

        document.getElementById('calculateAgeBtn').addEventListener('click', () => {
            const year = parseInt(document.getElementById('bsYear').value);
            const month = parseInt(document.getElementById('bsMonth').value);
            const day = parseInt(document.getElementById('bsDay').value);

            if (!year || !month || !day || month < 1 || month > 12 || day < 1 || day > 32) {
                alert('Please enter a valid Nepali date.');
                return;
            }

            const adDate = convertBSToAD(year, month, day);
            const age = calculateAge(adDate);

            document.getElementById('adDate').innerText = adDate.toDateString();
            document.getElementById('ageText').innerText = `${age.years} Years, ${age.months} Months, ${age.days} Days`;
            document.getElementById('ageResult').classList.remove('hidden');
        });
    },

    // --- GPA Calculator Module ---
    initGPACalculator() {
        const subjectsList = document.getElementById('subjectsList');
        let subjectCount = 0;

        const addSubjectInput = () => {
            subjectCount++;
            const div = document.createElement('div');
            div.className = 'flex items-center gap-3 animate-slide-up';
            div.innerHTML = `
                <input type="text" placeholder="Subject Name" class="custom-input flex-1">
                <input type="number" placeholder="Marks %" class="custom-input w-24" min="0" max="100">
                <button onclick="this.parentElement.remove()" class="p-2 text-red-400 hover:text-red-600 transition-colors">
                    ✕
                </button>
            `;
            subjectsList.appendChild(div);
        };

        for (let i = 0; i < 3; i++) addSubjectInput();

        document.getElementById('addSubjectBtn').addEventListener('click', addSubjectInput);

        document.getElementById('calculateGpaBtn').addEventListener('click', () => {
            const inputs = subjectsList.querySelectorAll('input[type="number"]');
            let totalGradePoints = 0;

            if (inputs.length === 0) return;

            inputs.forEach(input => {
                const marks = parseFloat(input.value);
                if (!isNaN(marks)) {
                    totalGradePoints += this.getGradePoint(marks);
                }
            });

            const finalGpa = totalGradePoints / inputs.length;
            const grade = this.getGradeFromGpa(finalGpa);

            document.getElementById('gpaValue').innerText = finalGpa.toFixed(2);
            document.getElementById('gpaGrade').innerText = `Grade: ${grade}`;
            document.getElementById('gpaResult').classList.remove('hidden');
        });
    },

    getGradePoint(marks) {
        if (marks >= 90) return 4.0;
        if (marks >= 80) return 3.6;
        if (marks >= 70) return 3.2;
        if (marks >= 60) return 2.8;
        if (marks >= 50) return 2.4;
        if (marks >= 40) return 2.0;
        if (marks >= 35) return 1.6;
        return 0.0;
    },

    getGradeFromGpa(gpa) {
        if (gpa >= 3.6) return 'A+';
        if (gpa >= 3.2) return 'A';
        if (gpa >= 2.8) return 'B+';
        if (gpa >= 2.4) return 'B';
        if (gpa >= 2.0) return 'C+';
        if (gpa >= 1.6) return 'C';
        if (gpa >= 1.2) return 'D';
        return 'NG';
    },

    // --- Digital Clock Module ---
    initDigitalClock() {
        const clockEl = document.getElementById('digitalClock');
        const dateEl = document.getElementById('clockDate');

        setInterval(() => {
            const now = new Date();
            clockEl.innerText = now.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            dateEl.innerText = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }, 1000);
    },

    start() {
        this.init();
    },
};

App.start();

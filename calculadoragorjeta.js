const tipForm = document.querySelector("#tipForm");
const billAmountInput = document.querySelector("#billAmount");
const tipPercentageInput = document.querySelector("#tipPercentage");
const numberOfPeopleInput = document.querySelector("#numberOfPeople");
const tipAmountOutput = document.querySelector("#tipAmount");
const totalAmountOutput = document.querySelector("#totalAmount");
const perPersonAmountOutput = document.querySelector("#perPersonAmount");
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeLabel = themeToggle.querySelector(".theme-label");

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

tipForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!tipForm.reportValidity()) {
        return;
    }

    const bill = Number(billAmountInput.value);
    const rate = Number(tipPercentageInput.value);
    const people = Number(numberOfPeopleInput.value);

    if (!Number.isFinite(bill) || bill <= 0 ||
        !Number.isFinite(rate) || rate < 0 ||
        !Number.isSafeInteger(people) || people < 1) {
        tipForm.reportValidity();
        return;
    }

    const tip = bill * rate / 100;
    const total = bill + tip;
    const perPerson = total / people;

    tipAmountOutput.textContent = currencyFormatter.format(tip);
    totalAmountOutput.textContent = currencyFormatter.format(total);
    perPersonAmountOutput.textContent = currencyFormatter.format(perPerson);
});

themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", `Ativar tema ${isDark ? "claro" : "escuro"}`);
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeLabel.textContent = `Tema ${isDark ? "claro" : "escuro"}`;
});

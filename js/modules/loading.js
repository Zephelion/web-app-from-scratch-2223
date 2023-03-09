export const spinner = document.getElementById("loading");


export const displayLoading = () => {
    spinner.classList.add("show");
};

export const hideLoading = () => {
    spinner.classList.remove("show");
};

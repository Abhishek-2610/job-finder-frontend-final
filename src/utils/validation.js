export const validateEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
};

export const validateNotEmpty = (value) => {
    return value.trim() !== '';
};

export const validatePassword = (password) => {
    //regex for Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return passwordRegex.test(password);
}

export const validateGitHubLink = (link) => {
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/;
    return githubRegex.test(link);
};

export const validateLinkedInLink = (link) => {
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;
    return linkedinRegex.test(link);
}
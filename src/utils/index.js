const fetchAdvice = async () => {
  try {
    const response = await fetch("	https://api.adviceslip.com/advice");
    const qoute = await response.json();
    return qoute;
  } catch (error) {
    throw new Error(error.message);
  }
};
export { fetchAdvice };

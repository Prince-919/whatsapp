export const sendMessage = async (req, res, next) => {
  try {
    res.send("Send Message");
  } catch (error) {
    next(error);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    res.send("Get Message");
  } catch (error) {
    next(error);
  }
};

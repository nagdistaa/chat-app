// !Send
export const send = async (req, res) => {
  try {
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
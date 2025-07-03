async function postRequest(req, res) {
  try {
    const body = req.body;
    console.log(body);
    return res.status(201).json({
      message: "post request successful",
      status: "success",
      result: body,
    });
  } catch (err) {
    return res.status(500).json({
      message: "api failed",
      status: "failed",
    });
  }
}
export default postRequest;

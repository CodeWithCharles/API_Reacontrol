module.exports = {
    errorResponse: (error, res) => {
        console.log(error);
        return res.status(500).json({
            success: 0,
            message: "Something went wrong, please contact a system administrator."
        });
    }
}
const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const { clearScreenDown } = require("readline");   //??????????? Mi ez?
const app = express();

app.use(express.json())
app.use(fileUpload());

app.get("/", (req, res) => {
	console.log(path.join(`${__dirname}/../frontend/index.html`))
	res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.get("/profile.jpg", (req, res) =>
	res.sendFile(path.join(`${__dirname}/../backend/data/profile.jpg`))
);

app.post("/", (req, res) => {

	const pictureUploadPath = __dirname + "/../backend/data/" + "profile.jpg";

	console.log(req.files);

	if (req.files) {
		const uploadedPicture = req.files.picture;
		uploadedPicture.mv(pictureUploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	fileData = JSON.parse(JSON.stringify(req.body));
	
	fileData.picture = "/profile.jpg";
	const fileDataString = JSON.stringify(fileData, null, 2);
	const uploadPath = __dirname + "/data/profile.json";

	fs.writeFileSync(uploadPath, fileDataString, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).send(err);
		}
	});

	return res.send(fileDataString);
});

app.delete("/", (req, res) => {
	const pictureUploadPath = __dirname + "/data/profile.jpg";
	const uploadPath = __dirname + "/data/profile.json";
	console.log(pictureUploadPath)
	console.log(uploadPath)
	
	if (fs.existsSync(pictureUploadPath)) {
		fs.unlinkSync(pictureUploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	if (fs.existsSync(uploadPath)) {
		fs.unlinkSync(uploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	return res.status(200).send("done");
});

app.listen(9000, (_) => console.log("127.0.0.1:9000"));
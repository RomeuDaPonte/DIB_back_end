const { generatePdf } = require("../models/orcamento");
const express = require("express");
const router = express.Router();
const pdfMake = require("../pdfmake/pdfmake");
const vfsFonts = require("../pdfmake/vfs_fonts");
pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.post("/downloadpdf", (req, res) => {
  let documentDefinition = generatePdf(req.body);

  const pdfDoc = pdfMake.createPdf(documentDefinition);
  pdfDoc.getBase64(data => {
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment;filename="filename.pdf"'
    });

    res.end(data);
  });
});

module.exports = router;

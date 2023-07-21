const express = require("express")
const bodyParser = require("body-parser")
const ExcelJS = require("exceljs")
const fs = require("fs")
const path = require("path")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use("/images", express.static("zones"))

const workbook = new ExcelJS.Workbook()

app.use("/", express.static(path.resolve("website", "build")))
app.get("/", (req, res) => {
    res.sendFile(path.resolve("website", "build", "index.html"))
})

app.post("/getSettings", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)
        res.json({
            rcam: sheet.getCell('B1').value,
            fcam: sheet.getCell('B2').value,
            tspd: sheet.getCell('B3').value,
            ntresh: sheet.getCell('B4').value,
            ntreshh: sheet.getCell('B5').value,
            oat: sheet.getCell('B6').value,
            fcount: sheet.getCell('B7').value,
            error: false
        })
    } catch (error) {
        res.json({ error: true })
    }
})

app.post("/setSettings", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)
        sheet.getCell('B1').value = +req.body.rcam
        sheet.getCell('B2').value = +req.body.fcam
        sheet.getCell('B3').value = +req.body.tspd
        sheet.getCell('B4').value = +req.body.ntresh
        sheet.getCell('B5').value = +req.body.ntreshh
        sheet.getCell('B6').value = +req.body.oat
        sheet.getCell('B7').value = +req.body.fcount
        await workbook.xlsx.writeFile("variables.xlsx")
        res.json({ error: false })
    } catch (error) {
        res.json({ error: true })
    }
})

app.post("/getMotionControl", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)
        res.json({
            pConst: sheet.getCell('B9').value,
            iConst: sheet.getCell('B10').value,
            dConst: sheet.getCell('B11').value,
            uLimit: sheet.getCell('B12').value,
            lLimit: sheet.getCell('B13').value,
            error: false
        })
    } catch (error) {
        res.json({ error: true })
    }
})

app.post("/setMotionControl", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)
        sheet.getCell('B9').value = +req.body.pConst
        sheet.getCell('B10').value = +req.body.iConst
        sheet.getCell('B11').value = +req.body.dConst
        sheet.getCell('B12').value = +req.body.uLimit
        sheet.getCell('B13').value = +req.body.lLimit
        await workbook.xlsx.writeFile("variables.xlsx")
        res.json({ error: false })
    } catch (error) {
        res.json({ error: true })
    }
})

app.post("/setMode", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)

        if (req.body.mode === "/training")
            sheet.getCell('B15').value = "T"
        else if (req.body.mode === "/navigation")
            sheet.getCell('B15').value = "N"
        else if (req.body.mode === "/remote")
            sheet.getCell('B15').value = "R"
        else if (req.body.mode === "/naming")
            sheet.getCell('B15').value = "C"
        else{
            sheet.getCell('B15').value = "D"
            sheet.getCell('B19').value = "D"
        }
        await workbook.xlsx.writeFile("variables.xlsx")
        res.json({ status: "Success" })
    } catch (error) {
        res.json({ status: "Mode couldn't be changed" })
    }
})

app.post("/zonesList", async (req, res)  => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(2)
        const zones = []
        const col1 = sheet.getColumn('A')
        col1.eachCell((cell, number) => {
            zones.push(cell.value)
        })
        zones.shift()
        const names = []
        const col2 = sheet.getColumn('B')
        col2.eachCell((cell, number) => {
            names.push(cell.value)
        })
        names.shift()
        const list = []
        zones.map((value, index) => {
            list.push({id: index+2, furl: `/images/front/${value}.jpg`, rurl: `/images/rear/${value}.jpg`,  zone: value, name: names[index]})
        })
        res.json({zones: list, error: false})
    } catch (error) {
        res.json({ error: true })
        console.log(error)
    }
})

app.post("/setZoneName", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(2)
        const list = req.body.list
        list.map((value) => {
            if(value.name)
                sheet.getCell(`B${value.id}`).value = value.name
        })
        await workbook.xlsx.writeFile("variables.xlsx")
        res.json({error: false})
    } catch (error) {
        console.log(error)
        res.json({error: true})
    }
})

app.post("/getNavSpeed", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)
        res.json({ speed: sheet.getCell('B16').value, error: false })
    } catch (error) {
        res.json({ error: true })
        console.log(error)
    }
})

app.post("/setNavSpeed", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)
        sheet.getCell('B16').value = +req.body.speed
        await workbook.xlsx.writeFile("variables.xlsx")
        res.json({ error: false })
    } catch (error) {
        res.json({ error: true })
        console.log(error)
    }
})

app.post("/setNavSource", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)
        sheet.getCell('B17').value = req.body.source
        await workbook.xlsx.writeFile("variables.xlsx")
        res.json({ error: false })
    } catch (error) {
        res.json({ error: true })
        console.log(error)
    }
})

app.post("/setNavDestination", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)
        sheet.getCell('B18').value = req.body.destination
        await workbook.xlsx.writeFile("variables.xlsx")
        res.json({ error: false })
    } catch (error) {
        res.json({ error: true })
        console.log(error)
    }
})

app.post("/startNav", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)
        sheet.getCell('B19').value = "N"
        await workbook.xlsx.writeFile("variables.xlsx")
        res.json({ error: false })
    } catch (error) {
        res.json({ error: true })
        console.log(error)
    }
})

app.post("/navStatus", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)
        if (sheet.getCell('B19').value === "D") {
            res.json({ status: "D", error: false })
        }
        else if (sheet.getCell('B19').value === "P") {
            res.json({ status: "P", error: false })
        }
        else if (sheet.getCell('B19').value === "R") {
            res.json({ status: "R", error: false })
        }
        else if(sheet.getCell('B19').value === "N") {
            res.json({ status: "N", error: false})
        }
    } catch (error) {
        res.json({ error: true })
        console.log("Workbook being used")
    }
})

app.post("/getRemoteSpeed", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)
        res.json({ speed: sheet.getCell('B21').value, error: false })
    } catch (error) {
        res.json({ error: true })
        console.log(error)
    }
})

app.post("/setRemoteSpeed", async (req, res) => {
    try {
        await workbook.xlsx.readFile("variables.xlsx")
        const sheet = workbook.getWorksheet(1)
        sheet.getCell('B21').value = +req.body.speed
        await workbook.xlsx.writeFile("variables.xlsx")
        res.json({ error: false })
    } catch (error) {
        res.json({ error: true })
        console.log(error)
    }
})

app.listen(4000, () => {
    console.log("Server running on port 4000")
})
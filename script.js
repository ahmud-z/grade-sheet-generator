document.getElementById("add-subject").addEventListener("click", () => {
    const gradeSheet = document.getElementById("grade-sheet");
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <input type="text" placeholder="Subject">
      <input type="number" placeholder="Credit" min="0" step="0.5">
      <input type="number" placeholder="CT1">
      <input type="number" placeholder="CT2">
      <input type="number" placeholder="KSA1">
      <input type="number" placeholder="KSA2">
      <input type="number" placeholder="MID">
      <input type="number" placeholder="Final">
    `;
    gradeSheet.appendChild(row);
  });
  
  document.getElementById("calculate").addEventListener("click", () => {
    const rows = document.querySelectorAll("#grade-sheet .row");
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results
  
    // Create the table
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
      <th>Subject</th>
      <th>Total Marks</th>
      <th>GPA</th>
      <th>Grade</th>
    `;
    table.appendChild(headerRow);
  
    let totalGPA = 0;
    let totalCredits = 0;
  
    rows.forEach((row) => {
      const inputs = row.querySelectorAll("input");
      const subject = inputs[0].value;
      const credit = parseFloat(inputs[1].value) || 0;
      const ct1 = parseFloat(inputs[2].value) || 0;
      const ct2 = parseFloat(inputs[3].value) || 0;
      const ksa1 = parseFloat(inputs[4].value) || 0;
      const ksa2 = parseFloat(inputs[5].value) || 0;
      const mid = parseFloat(inputs[6].value) || 0;
      const final = parseFloat(inputs[7].value) || 0;
  
      // Calculate total marks based on the given weightage
      const ctAvg = (ct1 + ct2) / 2; // CT1 and CT2 average
      const totalMarks = ctAvg + ksa1 + ksa2 + mid + final;
  
      // Determine grade and GPA based on the criteria
      let grade, gpa;
      if (totalMarks >= 80) {
        grade = "A+";
        gpa = 4.0;
      } else if (totalMarks >= 75) {
        grade = "A";
        gpa = 3.75;
      } else if (totalMarks >= 70) {
        grade = "A-";
        gpa = 3.5;
      } else if (totalMarks >= 65) {
        grade = "B+";
        gpa = 3.25;
      } else if (totalMarks >= 60) {
        grade = "B";
        gpa = 3.0;
      } else if (totalMarks >= 55) {
        grade = "B-";
        gpa = 2.75;
      } else if (totalMarks >= 50) {
        grade = "C+";
        gpa = 2.5;
      } else if (totalMarks >= 45) {
        grade = "C";
        gpa = 2.25;
      } else if (totalMarks >= 40) {
        grade = "D";
        gpa = 2.0;
      } else {
        grade = "F";
        gpa = 0.0;
      }
  
      // Accumulate GPA for CGPA calculation
      totalGPA += gpa * credit;
      totalCredits += credit;
  
      // Append row to the table
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
        <td>${subject}</td>
        <td>${totalMarks.toFixed(2)}</td>
        <td>${gpa.toFixed(2)}</td>
        <td>${grade}</td>
      `;
      table.appendChild(tableRow);
    });
  
    // Calculate overall GPA and CGPA
    const cgpa = totalCredits ? (totalGPA / totalCredits).toFixed(2) : 0;
  
    // Add CGPA row
    const cgpaRow = document.createElement("tr");
    cgpaRow.innerHTML = `
      <td colspan="2" style="font-weight: bold;">Overall GPA</td>
      <td colspan="2" style="font-weight: bold;">${cgpa}</td>
    `;
    table.appendChild(cgpaRow);
  
    resultsDiv.appendChild(table);
  
    // Show the print button
    document.getElementById("print").style.display = "inline-block";
  });
  
  document.getElementById("print").addEventListener("click", () => {
    const printContent = document.querySelector(".container").innerHTML;
    const printWindow = window.open("", "", "height=600, width=800");
    printWindow.document.write("<html><head><title>Grade Sheet</title></head><body>");
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  });
  
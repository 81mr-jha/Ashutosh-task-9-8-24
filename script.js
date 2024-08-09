
document.addEventListener('DOMContentLoaded', async function () {
    const { jsPDF } = window.jspdf;
    
    const form = document.getElementById('userForm');
    const idNumberField = document.getElementById('idNumber');
    const outputSection = document.getElementById('output');
    const outputName = document.getElementById('outputName');
    const outputPhoto = document.getElementById('outputPhoto');
    const outputRank = document.getElementById('outputRank');
    const outputIdNumber = document.getElementById('outputIdNumber');
    const downloadBtn = document.getElementById('downloadBtn');

  
    function generateIdNumber() {
        const randomId = Math.floor(100000 + Math.random() * 900000);
        return `#${randomId}`;
    }

   
    idNumberField.value = generateIdNumber();

    
    form.addEventListener('submit', function (e) {
        e.preventDefault();

       
        const name = document.getElementById('name').value;
        const photoFile = document.getElementById('photo').files[0];
        const rank = document.getElementById('rank').value;
        const idNumber = idNumberField.value;

        
        outputName.textContent = name;
        outputRank.textContent = rank;
        outputIdNumber.textContent = idNumber;

        
        outputSection.style.display = 'block';

        
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                outputPhoto.src = e.target.result;

               
                generatePDF(name, e.target.result, rank, idNumber);
            };
            reader.readAsDataURL(photoFile);
        } else {
     
            generatePDF(name, null, rank, idNumber);
        }
    });

    
    function generatePDF(name, imgData, rank, idNumber) {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('User Information', 20, 20);

        doc.setFontSize(12);
        doc.text(`Name: ${name}`, 20, 40);
        doc.text(`Rank: ${rank}`, 20, 50);
        doc.text(`ID Number: ${idNumber}`, 20, 60);

        
        if (imgData) {
            doc.addImage(imgData, 'JPEG', 20, 70, 50, 50);
        }
 
        downloadBtn.style.display = 'block';
        downloadBtn.onclick = function () {
            doc.save(`${name}_Information.pdf`);
        };
    }
});

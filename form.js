
        document.getElementById('myForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset all fields to default color
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                input.classList.remove('empty');
            });
            
            // Check for empty fields
            let allFilled = true;
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    input.classList.add('empty');
                    allFilled = false;
                }
            });
            
            // If all fields are filled, go to success page
            if (allFilled) {
                window.location.href = 'success.html';
            }
        });
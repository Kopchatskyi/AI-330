
const map = L.map('map').setView([53.430127, 14.564802], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);
let marker = L.marker([53.430127, 14.564802]).addTo(map);
marker.bindPopup("<strong>Hello!</strong><br>This is a popup.");

//localization
document.getElementById("getLocation").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 18);
        L.marker([latitude, longitude]).addTo(map)
            .bindPopup("Your localization")
            .openPopup();
    });
});


document.getElementById("saveButton").addEventListener("click", () => {
    leafletImage(map, (err, canvas) => {
        if (err) {
            console.error("Error:", err);
            return;
        }

        createPuzzle(canvas.toDataURL());
    });
});


function createPuzzle(imageSrc) {
    const puzzleBoard = document.getElementById('puzzle-board');
    const puzzleTarget = document.getElementById('puzzle-target');
    puzzleBoard.innerHTML = '';
    puzzleTarget.innerHTML = '';

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 300;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        //16 pieces
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                const pieceCanvas = document.createElement('canvas');
                const pieceCtx = pieceCanvas.getContext('2d');
                pieceCanvas.width = 75;
                pieceCanvas.height = 75;


                pieceCtx.drawImage(canvas, x * 75, y * 75, 75, 75, 0, 0, 75, 75);


                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.style.backgroundImage = `url(${pieceCanvas.toDataURL()})`;
                piece.style.backgroundSize = 'cover';
                piece.draggable = true;
                piece.dataset.x = x;
                piece.dataset.y = y;


                piece.addEventListener('dragstart', dragStart);
                piece.addEventListener('dragend', dragEnd);


                puzzleBoard.appendChild(piece);

                // empty cells w naszej plansze docelowej(gdzie ukladamy)
                const targetCell = document.createElement('div');
                targetCell.classList.add('puzzle-cell');
                targetCell.dataset.x = x;
                targetCell.dataset.y = y;


                targetCell.addEventListener('dragover', (event) => {
                    event.preventDefault();
                });

                targetCell.addEventListener('drop', (event) => {
                    event.preventDefault();
                    if (event.target.classList.contains('puzzle-cell')) {
                        event.target.appendChild(draggedPiece);
                        checkPuzzle();
                    }
                });


                puzzleTarget.appendChild(targetCell);
            }
        }

        // shuffle puzzle
        Array.from(puzzleBoard.children)
            .sort(() => Math.random() - 0.5)
            .forEach(piece => puzzleBoard.appendChild(piece));
    };
}

//drag-and-drop
let draggedPiece = null;

function dragStart(event) {
    draggedPiece = event.target;
    setTimeout(() => (event.target.style.visibility = 'hidden'), 0);
}

function dragEnd(event) {
    draggedPiece.style.visibility = 'visible';
    draggedPiece = null;
}

// if puzzle is correct ulozone
function checkPuzzle() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    let correct = true;

    pieces.forEach(piece => {
        const x = piece.dataset.x;
        const y = piece.dataset.y;
        const index = Array.from(pieces).indexOf(piece);
        const correctIndex = parseInt(y) * 4 + parseInt(x);
        if (index !== correctIndex) {
            correct = false;
        }
    });

    if (correct) {
        alert("Gratulacje! Puzzle zostały poprawnie ułożone!");
        new Notification("Gratulacje! Puzzle zostały poprawnie ułożone!");
    }
}

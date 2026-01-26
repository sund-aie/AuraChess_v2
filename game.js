        const canvas = document.getElementById('chessBoard');
        const ctx = canvas.getContext('2d');
        const SQUARE_SIZE = 80;
        const BOARD_SIZE = 8;

        let board = [];
        let selectedPiece = null;
        let validMoves = [];
        let currentPlayer = 'white';
        let gameOver = false;
        let captureAnimation = null;
        let moveAnimation = null;
        let deadPieces = { white: [], black: [] };

        const PIECES = {
            white: {
                king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙'
            },
            black: {
                king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟'
            }
        };

        function initBoard() {
            board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
            gameOver = false;
            currentPlayer = 'white';
            selectedPiece = null;
            validMoves = [];
            captureAnimation = null;
            moveAnimation = null;
            deadPieces = { white: [], black: [] };

            // Place pawns
            for (let col = 0; col < BOARD_SIZE; col++) {
                board[1][col] = { type: 'pawn', color: 'black' };
                board[6][col] = { type: 'pawn', color: 'white' };
            }

            // Place other pieces
            const backRow = [
                'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'
            ];

            for (let col = 0; col < BOARD_SIZE; col++) {
                board[0][col] = { type: backRow[col], color: 'black' };
                board[7][col] = { type: backRow[col], color: 'white' };
            }

            updateTurnInfo();
            updateScoreboard();
        }

        function drawBoard() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw board squares
            for (let row = 0; row < BOARD_SIZE; row++) {
                for (let col = 0; col < BOARD_SIZE; col++) {
                    const x = col * SQUARE_SIZE;
                    const y = row * SQUARE_SIZE;
                    
                    ctx.fillStyle = (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863';
                    ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);

                    // Highlight selected square
                    if (selectedPiece && selectedPiece.row === row && selectedPiece.col === col) {
                        ctx.fillStyle = 'rgba(255, 255, 0, 0.4)';
                        ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
                    }

                    // Highlight valid moves
                    if (validMoves.some(m => m.row === row && m.col === col)) {
                        ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
                        ctx.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
                    }
                }
            }

            // Draw pieces
            for (let row = 0; row < BOARD_SIZE; row++) {
                for (let col = 0; col < BOARD_SIZE; col++) {
                    const piece = board[row][col];
                    if (piece) {
                        const x = col * SQUARE_SIZE + SQUARE_SIZE / 2;
                        const y = row * SQUARE_SIZE + SQUARE_SIZE / 2;

                        // Handle animations
                        let drawX = x;
                        let drawY = y;

                        if (captureAnimation) {
                            if (captureAnimation.phase === 'shaking') {
                                const shakeOffset = Math.sin(Date.now() * 0.05) * 5;
                                if (captureAnimation.from.row === row && captureAnimation.from.col === col) {
                                    drawX += shakeOffset;
                                    drawY += shakeOffset;
                                }
                            } else if (captureAnimation.phase === 'shooting') {
                                if (captureAnimation.from.row === row && captureAnimation.from.col === col) {
                                    const progress = Math.min((Date.now() - captureAnimation.startTime - 400) / 400, 1);
                                    drawX = x + (captureAnimation.to.col * SQUARE_SIZE + SQUARE_SIZE / 2 - x) * progress;
                                    drawY = y + (captureAnimation.to.row * SQUARE_SIZE + SQUARE_SIZE / 2 - y) * progress;
                                }
                            }
                        }

                        if (moveAnimation) {
                            if (moveAnimation.from.row === row && moveAnimation.from.col === col) {
                                const progress = Math.min((Date.now() - moveAnimation.startTime) / 500, 1);
                                drawX = x + (moveAnimation.to.col * SQUARE_SIZE + SQUARE_SIZE / 2 - x) * progress;
                                drawY = y + (moveAnimation.to.row * SQUARE_SIZE + SQUARE_SIZE / 2 - y) * progress;
                            }
                        }

                        ctx.font = '60px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = piece.color === 'white' ? '#ffffff' : '#000000';
                        ctx.fillText(PIECES[piece.color][piece.type], drawX, drawY);
                    }
                }
            }
        }

        function getValidMoves(row, col) {
            const piece = board[row][col];
            if (!piece) return [];

            const moves = [];
            const directions = {
                rook: [[-1, 0], [1, 0], [0, -1], [0, 1]],
                bishop: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
                queen: [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]],
                king: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]],
                knight: [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]],
                pawn: piece.color === 'white' 
                    ? [[-1, 0], [-2, 0], [-1, -1], [-1, 1]]
                    : [[1, 0], [2, 0], [1, -1], [1, 1]]
            };

            const pieceDirs = directions[piece.type] || [];

            for (const [dr, dc] of pieceDirs) {
                if (piece.type === 'knight' || piece.type === 'king') {
                    const newRow = row + dr;
                    const newCol = col + dc;
                    if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
                        const target = board[newRow][newCol];
                        if (!target || target.color !== piece.color) {
                            moves.push({ row: newRow, col: newCol });
                        }
                    }
                } else if (piece.type === 'pawn') {
                    if (dc === 0) {
                        // Forward moves
                        const newRow = row + dr;
                        if (newRow >= 0 && newRow < BOARD_SIZE && !board[newRow][col]) {
                            moves.push({ row: newRow, col });
                            if (Math.abs(dr) === 2 && row === (piece.color === 'white' ? 6 : 1)) {
                                const nextRow = row + (dr / 2);
                                if (!board[nextRow][col]) {
                                    // Already added above
                                }
                            }
                        }
                    } else {
                        // Diagonal captures
                        const newRow = row + dr;
                        const newCol = col + dc;
                        if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
                            const target = board[newRow][newCol];
                            if (target && target.color !== piece.color) {
                                moves.push({ row: newRow, col: newCol });
                            }
                        }
                    }
                } else {
                    // Rook, bishop, queen - sliding pieces
                    let newRow = row + dr;
                    let newCol = col + dc;
                    while (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
                        const target = board[newRow][newCol];
                        if (!target) {
                            moves.push({ row: newRow, col: newCol });
                        } else {
                            if (target.color !== piece.color) {
                                moves.push({ row: newRow, col: newCol });
                            }
                            break;
                        }
                        newRow += dr;
                        newCol += dc;
                    }
                }
            }

            return moves;
        }

        function updateTurnInfo() {
            const turnInfo = document.getElementById('turnInfo');
            if (gameOver) {
                const winner = currentPlayer === 'white' ? 'Black' : 'White';
                turnInfo.textContent = `Game Over! ${winner} Wins!`;
                turnInfo.style.color = '#ff0000';
            } else {
                turnInfo.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s Turn`;
                turnInfo.style.color = '#000000';
            }
        }

        function updateScoreboard() {
            const whiteCaptured = document.getElementById('whiteCaptured');
            const blackCaptured = document.getElementById('blackCaptured');
            
            whiteCaptured.textContent = deadPieces.black.map(p => PIECES.black[p.type]).join(' ');
            blackCaptured.textContent = deadPieces.white.map(p => PIECES.white[p.type]).join(' ');
        }

        function animate() {
            drawBoard();
            
            if (captureAnimation) {
                const elapsed = Date.now() - captureAnimation.startTime;
                
                if (captureAnimation.phase === 'shaking' && elapsed > 400) {
                    captureAnimation.phase = 'shooting';
                }
                
                if (elapsed > 800) {
                    captureAnimation = null;
                }
            }
            
            if (moveAnimation && Date.now() - moveAnimation.startTime > 500) {
                moveAnimation = null;
            }
            
            requestAnimationFrame(animate);
        }

        canvas.addEventListener('click', (e) => {
            if (gameOver || captureAnimation || moveAnimation) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const col = Math.floor(x / SQUARE_SIZE);
            const row = Math.floor(y / SQUARE_SIZE);

            if (selectedPiece) {
                if (validMoves.some(m => m.row === row && m.col === col)) {
                    const targetPiece = board[row][col];
                    const movingPiece = board[selectedPiece.row][selectedPiece.col];

                    if (targetPiece) {
                        captureAnimation = {
                            from: { row: selectedPiece.row, col: selectedPiece.col },
                            to: { row, col },
                            attackerPiece: movingPiece,
                            victimPiece: targetPiece,
                            phase: 'shaking',
                            startTime: Date.now()
                        };

                        setTimeout(() => {
                            deadPieces[targetPiece.color].push(targetPiece);
                            updateScoreboard();
                            
                            board[row][col] = board[selectedPiece.row][selectedPiece.col];
                            board[selectedPiece.row][selectedPiece.col] = null;

                            if (targetPiece.type === 'king') {
                                gameOver = true;
                                updateTurnInfo();
                            }

                            selectedPiece = null;
                            validMoves = [];
                            currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
                            updateTurnInfo();
                        }, 800);
                    } else {
                        moveAnimation = {
                            from: { row: selectedPiece.row, col: selectedPiece.col },
                            to: { row, col },
                            piece: movingPiece,
                            startTime: Date.now()
                        };

                        setTimeout(() => {
                            board[row][col] = board[selectedPiece.row][selectedPiece.col];
                            board[selectedPiece.row][selectedPiece.col] = null;
                            selectedPiece = null;
                            validMoves = [];
                            currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
                            updateTurnInfo();
                        }, 500);
                    }
                } else {
                    selectedPiece = null;
                    validMoves = [];
                }
            } else {
                const piece = board[row][col];
                if (piece && piece.color === currentPlayer) {
                    selectedPiece = { row, col };
                    validMoves = getValidMoves(row, col);
                }
            }
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            initBoard();
        });

        initBoard();
        animate();

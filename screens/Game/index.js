import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import styles from './style';

const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
];

const generateBoard = (rows, cols, mines) => {
    const board = Array(rows)
        .fill()
        .map(() => Array(cols).fill({ isMine: false, isRevealed: false, count: 0, isFlagged: false }));

    let placedMines = 0;
    while (placedMines < mines) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (!board[r][c].isMine) {
            board[r][c] = { ...board[r][c], isMine: true };
            placedMines++;
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j].isMine) continue;
            let count = 0;
            directions.forEach(([dr, dc]) => {
                const newRow = i + dr;
                const newCol = j + dc;
                if (newRow >= 0 && newRow < rows &&
                    newCol >= 0 && newCol < cols &&
                    board[newRow][newCol].isMine) {
                    count++;
                }
            });

            board[i][j] = { ...board[i][j], count };
        }
    }
    return board;
};

const Game = ({ navigation }) => {
    const [rows, setRows] = useState(9);
    const [cols, setCols] = useState(9);
    const [mines, setMines] = useState(10);
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [firstClick, setFirstClick] = useState(true);
    const [revealedTiles, setRevealedTiles] = useState(0);
    const [win, setWin] = useState(false);
    const [personalBest, setPersonalBest] = useState(null);
    const totalTiles = rows * cols;

    useEffect(() => {
        //AsyncStorage.clear();
        const loadPersonalBest = async () => {
            try {
                const savedTime = await AsyncStorage.getItem('personalBest');
                if (savedTime !== null) {
                    setPersonalBest(Number(savedTime));
                }
            } catch (error) {
                console.error('Error loading personal best:', error);
            }
        };

        loadPersonalBest();
    }, []);

    useEffect(() => {
        setBoard(generateBoard(rows, cols, mines));
    }, [rows, cols, mines]);

    useEffect(() => {
        let timerInterval;
        if (isRunning) {
            timerInterval = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 1); // Update every 10ms
        } else {
            clearInterval(timerInterval);
        }
        return () => clearInterval(timerInterval);
    }, [isRunning, startTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    const resetGame = () => {
        setBoard(generateBoard(rows, cols, mines));
        setGameOver(false);
        setElapsedTime(0);
        setIsRunning(false);
        setStartTime(null);
        setFirstClick(true);
        setRevealedTiles(0);
        setWin(false);
    };

    const handleClick = (row, col) => {
        if (board[row][col].isRevealed || board[row][col].isFlagged || gameOver || win) return;

        let updatedBoard = [...board];

        if (firstClick) {
            setStartTime(Date.now());
            setIsRunning(true);
            setFirstClick(false);
        }

        if (updatedBoard[row][col].isMine) {
            setGameOver(true);
            setIsRunning(false);
            revealAllBombs(updatedBoard);
            return;
        }

        const revealCell = (r, c) => {
            if (r < 0 || r >= rows ||
                c < 0 || c >= cols ||
                updatedBoard[r][c].isRevealed) {
                return;
            }

            if (!updatedBoard[r][c].isFlagged) updatedBoard[r][c] = { ...updatedBoard[r][c], isRevealed: true };
            setRevealedTiles((prev) => prev + 1);
            console.log(revealedTiles)

            if (updatedBoard[r][c].count == 0 && !updatedBoard[r][c].isMine) {
                directions.forEach(([dr, dc]) => revealCell(r + dr, c + dc));
            }
        };

        if (revealedTiles + 1 === totalTiles - mines) {
            setWin(true);
            setIsRunning(false);

            const finalTime = Date.now() - startTime;

            if (personalBest > finalTime || personalBest == null) {
                setPersonalBest(finalTime);
                AsyncStorage.setItem('personalBest', finalTime.toString());
            }
        }

        revealCell(row, col)
        setBoard(updatedBoard);
    };

    const revealAllBombs = (board) => {
        const updatedBoard = board.map((row) =>
            row.map((cell) => ({
                ...cell,
                isRevealed: cell.isMine ? true : cell.isRevealed,
            }))
        );
        setBoard(updatedBoard);
    };

    const handleLongPress = (row, col) => {
        const updatedBoard = [...board];
        updatedBoard[row][col] = { ...updatedBoard[row][col], isFlagged: !updatedBoard[row][col].isFlagged };
        setBoard(updatedBoard);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.restartContainer} onPress={resetGame}>
                <Text style={styles.restartButtonText}>↺</Text>
            </TouchableOpacity>
            <View style={styles.board}>
                {board.map((row, rowIndex) => (
                    <View style={styles.row} key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <TouchableOpacity
                                key={colIndex}
                                style={[
                                    styles.cell,
                                    cell.isRevealed ? styles.revealedCell : null,
                                    cell.isRevealed && cell.isMine ? styles.bombCell : null,
                                ]}
                                onPress={() => handleClick(rowIndex, colIndex)}
                                onLongPress={() => handleLongPress(rowIndex, colIndex)}
                                delayLongPress={100}
                            >
                                {cell.isRevealed ? (
                                    <Text style={styles.cellText}>
                                        {cell.isMine ? "⬤" : cell.count > 0 ? cell.count : ""}
                                    </Text>
                                ) : cell.isFlagged ? (
                                    <Text style={styles.flag}>⚑</Text>
                                ) : null}
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
            <View style={styles.timerContainer}>
                <Text
                    style={[
                        styles.timer,
                        win ? styles.wonTimer : null
                    ]}>
                    Time: {formatTime(elapsedTime)}</Text>
                {personalBest != null && <Text style={styles.pbTimer}>PB: {formatTime(personalBest)}</Text>}
            </View>

        </View>
    );
};

export default Game;
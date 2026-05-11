#include <stdio.h>

int main() {

    char board[9][9];
    int i, j;
    
    // 盤を初期化（すべて空）
    for(i = 0; i < 9; i++) {
        for(j = 0; j < 9; j++) {
            board[i][j] = '.';
        }
    }
    
    int turn = 0;        // 0:黒(X), 1:白(O)
    int row, col;
    int game_over = 0;
    
    printf("=== 5目並べ（シンプル版） ===\n");
    printf("黒(X)が先手です。行と列を0〜8で入力してください。\n\n");
    
    while(!game_over) {
        // 盤を表示
        printf("  0 1 2 3 4 5 6 7 8\n");
        for(i = 0; i < 9; i++) {
            printf("%d ", i);
            for(j = 0; j < 9; j++) {
                printf("%c ", board[i][j]);
            }
            printf("\n");
        }
        printf("\n");
        
        // 現在のターン表示
        if(turn == 0) {
            printf("黒(X)の番です。\n");
        } else {
            printf("白(O)の番です。\n");
        }
        
        // 入力
        printf("行 (0-8): ");
        scanf("%d", &row);
        printf("列 (0-8): ");
        scanf("%d", &col);
        
        // 入力チェック
        if(row < 0 || row > 8 || col < 0 || col > 8) {
            printf("0〜8の範囲で入力してください！\n\n");
            continue;
        }
        if(board[row][col] != '.') {
            printf("そこはすでに埋まっています！\n\n");
            continue;
        }
        
        // 石を置く
        if(turn == 0) {
            board[row][col] = 'X';
        } else {
            board[row][col] = 'O';
        }
        
        // 5目並んだかチェック
        if(check_win(board, row, col, turn)) {
            printf("\n");
            // 最後の盤を表示
            printf("  0 1 2 3 4 5 6 7 8\n");
            for(i = 0; i < 9; i++) {
                printf("%d ", i);
                for(j = 0; j < 9; j++) {
                    printf("%c ", board[i][j]);
                }
                printf("\n");
            }
            if(turn == 0) {
                printf("★ 黒(X)の勝ち！ ★\n");
            } else {
                printf("★ 白(O)の勝ち！ ★\n");
            }
            game_over = 1;
            break;
        }
        
        // 盤がいっぱいになったかチェック
        int full = 1;
        for(i = 0; i < 9; i++) {
            for(j = 0; j < 9; j++) {
                if(board[i][j] == '.') {
                    full = 0;
                    break;
                }
            }
            if(!full) break;
        }
        if(full) {
            printf("引き分けです！\n");
            game_over = 1;
        }
        
        // ターン交代
        turn = 1 - turn;
        printf("\n");
    }
    
    printf("ゲーム終了！\n");
    return 0;
}

// 勝ち判定関数（5目並びチェック）
int check_win(char board[9][9], int r, int c, int turn) {
    char stone = (turn == 0) ? 'X' : 'O';
    int count;
    
    // 横方向チェック
    count = 1;
    for(int i = 1; i < 5; i++) {
        if(c + i < 9 && board[r][c + i] == stone) count++;
        else break;
    }
    for(int i = 1; i < 5; i++) {
        if(c - i >= 0 && board[r][c - i] == stone) count++;
        else break;
    }
    if(count >= 5) return 1;
    
    // 縦方向チェック
    count = 1;
    for(int i = 1; i < 5; i++) {
        if(r + i < 9 && board[r + i][c] == stone) count++;
        else break;
    }
    for(int i = 1; i < 5; i++) {
        if(r - i >= 0 && board[r - i][c] == stone) count++;
        else break;
    }
    if(count >= 5) return 1;
    
    // 右下斜め（\）チェック
    count = 1;
    for(int i = 1; i < 5; i++) {
        if(r + i < 9 && c + i < 9 && board[r + i][c + i] == stone) count++;
        else break;
    }
    for(int i = 1; i < 5; i++) {
        if(r - i >= 0 && c - i >= 0 && board[r - i][c - i] == stone) count++;
        else break;
    }
    if(count >= 5) return 1;
    
    // 右上斜め（/）チェック
    count = 1;
    for(int i = 1; i < 5; i++) {
        if(r - i >= 0 && c + i < 9 && board[r - i][c + i] == stone) count++;
        else break;
    }
    for(int i = 1; i < 5; i++) {
        if(r + i < 9 && c - i >= 0 && board[r + i][c - i] == stone) count++;
        else break;
    }
    if(count >= 5) return 1;
    
    return 0;
}

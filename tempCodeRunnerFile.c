#include <stdio.h>
#include <stdlib.h>

#define TAM 10

int main(){
    int a[TAM][TAM], b[TAM][TAM];
    int c[TAM][TAM];
    int i, j;

    for(i = 0; i < TAM; i++){
        for(j = 0; j < TAM; j++){
            printf("Adicione o valor %d matriz A: ", (i + 1));
            scanf("%d", &a[i][j]);

            printf("Adicione o valor %d matriz B: ", (i + 1));
            scanf("%d", &b[i][j]);
        }
    }
    for(i = 0; i < TAM; i++){
        for(j = 0; j < TAM; j++){
            c[i][j] = a[i][j] + b[i][j];
        }
    }
    printf("SOMA DAS MATRIZES");
    for(i = 0; i < TAM; i++){
        for(j = 0; j < TAM; j++){
            printf("%d\t", c[i][j]);
        }
        printf("\n");
    }
}
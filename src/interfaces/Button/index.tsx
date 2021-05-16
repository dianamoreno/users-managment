export interface ButtonProps{
    type: 'primary' | 'default';
    onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
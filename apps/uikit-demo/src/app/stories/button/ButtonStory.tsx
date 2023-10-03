import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  IconOpenEye,
} from '@viewshka/uikit';
import React, { PropsWithChildren } from 'react';
import ComponentStory, { StoryColumn } from '../../common/ComponentStory';
import { addStory } from '../../stories';
import styles from './ButtonStory.module.css';

function ButtonStory() {
  return (
    <ComponentStory>
      <StoryColumn>
        <div className={styles['size-container']}>
          <h2 className={styles['size-name']}>Small</h2>
          <ButtonVariants type={'primary'} size={'small'} />
          <ButtonVariants type={'secondary'} size={'small'} />
          <ButtonVariants type={'link'} size={'small'} />
          <ButtonVariants type={'ghost'} size={'small'} />
        </div>
        <div className={styles['size-container']}>
          <h2 className={styles['size-name']}>Medium</h2>
          <ButtonVariants type={'primary'} size={'medium'} />
          <ButtonVariants type={'secondary'} size={'medium'} />
          <ButtonVariants type={'link'} size={'medium'} />
          <ButtonVariants type={'ghost'} size={'medium'} />
        </div>
        <div className={styles['size-container']}>
          <h2 className={styles['size-name']}>Large</h2>
          <ButtonVariants type={'primary'} size={'large'} />
          <ButtonVariants type={'secondary'} size={'large'} />
          <ButtonVariants type={'link'} size={'large'} />
          <ButtonVariants type={'ghost'} size={'large'} />
        </div>
      </StoryColumn>
    </ComponentStory>
  );
}

type ButtonsRowProps = PropsWithChildren & {
  name: string;
  className: string;
};

function ButtonsRow({ children, name, className }: ButtonsRowProps) {
  return (
    <div className={styles['button-row']}>
      <p className={className}>{name}</p>
      {children}
    </div>
  );
}

type ButtonVariantsProps = {
  type: ButtonType;
  size: ButtonSize;
  showType?: boolean;
};

function ButtonVariants({ type, size, showType = false }: ButtonVariantsProps) {
  return (
    <ButtonsRow name={type} className={styles['type-name']}>
      <div className={styles['button-column']}>
        <ButtonStateVariants state={'default'} size={size} type={type} />
        <ButtonStateVariants state={'hovered'} size={size} type={type} />
        <ButtonStateVariants state={'pressed'} size={size} type={type} />
        <ButtonStateVariants state={'disabled'} size={size} type={type} />
        <ButtonStateVariants state={'loading'} size={size} type={type} />
      </div>
    </ButtonsRow>
  );
}

type ButtonStateVariantsProps = ButtonVariantsProps & {
  state: ButtonState;
};

function ButtonStateVariants({ state, type, size }: ButtonStateVariantsProps) {
  const onClick = () => console.log('click on ', type, state, size);
  return (
    <ButtonsRow name={state} className={styles['state-name']}>
      <Button state={'default'} type={type} size={size} onClick={onClick}>
        Посмотреть
      </Button>
      <Button state={'default'} type={type} size={size} onClick={onClick}>
        <IconOpenEye></IconOpenEye>
        Посмотреть
      </Button>
      <Button state={'default'} type={type} size={size} onClick={onClick}>
        Посмотреть
        <IconOpenEye></IconOpenEye>
      </Button>
      <Button state={'default'} type={type} size={size} onClick={onClick}>
        <IconOpenEye></IconOpenEye>
      </Button>
    </ButtonsRow>
  );
}

addStory('Button', ButtonStory);

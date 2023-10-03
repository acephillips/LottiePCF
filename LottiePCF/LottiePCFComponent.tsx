import * as React from 'react';
import { Player as Lottie } from "@lottiefiles/react-lottie-player"
import { PlayerState as LottieState } from "@lottiefiles/react-lottie-player"

export interface ILottieProps {
  loop?: boolean;
  autoplay?: boolean;
  path: string;
  playing?: boolean;
  paused?: boolean;
  stopped?: boolean;
  playerRef?: React.RefObject<Lottie>
  disableClicktoPause?: boolean;
}

export class LottiePCFComponent extends React.Component<ILottieProps> {
  state = { isPaused: true };
  playerRef = React.useRef<Lottie>(null);
  constructor(props: ILottieProps) {
    super(props)
  }

  handleClickEvents() {
    if (!this.props.disableClicktoPause) {
      if (this.playerRef.current !== null) {
        switch (this.playerRef.current?.state.playerState) {
          case LottieState.Playing:
            if (this.props.loop) {
              this.pauseAnimation();
            } else {
              this.stopAnimation();
            }
            break;
          case LottieState.Paused:
            if (this.props.loop) {
              this.playAnimation();
            }
            break;
          case LottieState.Stopped:
            if (!this.props.loop) {
              this.playAnimation();
            }
            break;
          default:
            this.playAnimation();
            break;
        }
      }
    }
  }

  animationCompleted() {
    console.log("The animation has completed it's cycle.")
  }

  animationReady() {
    console.log('Animation player component is ready to proceed.');
    if (this.props.autoplay) {
      this.playerRef.current?.play();
    }
  }

  pauseAnimation() {
    this.playerRef.current?.pause()
    console.log('Pausing Animation.')
  }

  playAnimation() {
    this.playerRef.current?.play();
    console.log("Playing Animation.")
  }

  stopAnimation() {
    this.playerRef.current?.stop();
    console.log("Stopping Animation.")
  }
  public render(): React.ReactNode {
    return (
      <div id="LottieContainer" onClick={this.handleClickEvents}>
        <Lottie
          ref={this.props.playerRef}
          className="LottiePlayer"
          onEvent={event => {
            switch (event) {
              case 'ready':
                this.animationReady();
                break;
              case 'freeze':
                this.stopAnimation()
                console.group('Animation has left the view of this screen. Halting animation.')
                break;
              case 'complete':
                this.animationCompleted();
            }
          }
          }
          autoplay={this.props.autoplay}
          loop={this.props.loop}
          src={this.props.path}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid meet'
          }
          }
        /></div>
    )
  }
}

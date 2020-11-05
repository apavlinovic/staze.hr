import React, { Component } from 'react';

interface FocusAwareProps {
    focusGainedHandler: () => void;
    focusLostHandler: () => void;
}

export class FocusAware extends Component<FocusAwareProps> {
    observedRef = React.createRef<HTMLElement>();
    handleOutsideClick = (event: Event) => {
        if (this.observedRef && event.target && this.observedRef.current) {
            if (!this.observedRef.current.contains(event.target as Node)) {
                this.props.focusLostHandler();
            } else {
                this.props.focusGainedHandler();
            }
        }
    };

    constructor(props: FocusAwareProps) {
        super(props);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
    }

    render() {
        return (
            <section className="focus-aware" ref={this.observedRef}>
                {this.props.children}
            </section>
        );
    }
}

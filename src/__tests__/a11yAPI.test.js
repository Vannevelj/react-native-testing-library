// @flow
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { render } from '..';

const BUTTON_LABEL = 'cool button';
const BUTTON_HINT = 'click this button';
const BUTTON_ROLE = 'button';
const TEXT_LABEL = 'cool text';
const TEXT_HINT = 'static text';
const TEXT_ROLE = 'link';
// Little hack to make all the methods happy with type
const NO_MATCHES_TEXT: any = 'not-existent-element';
const NO_INSTANCES_FOUND = 'No instances found';
const FOUND_TWO_INSTANCES = 'Expected 1 but found 2 instances';

const Typography = ({ children, ...rest }: any) => {
  return <Text {...rest}>{children}</Text>;
};

class Button extends React.Component<any> {
  render() {
    return (
      // $FlowFixMe - accessibilityStates removed in RN 0.62
      <TouchableOpacity
        accessibilityHint={BUTTON_HINT}
        accessibilityLabel={BUTTON_LABEL}
        accessibilityRole={BUTTON_ROLE}
        accessibilityStates={['selected']}
      >
        <Typography
          accessibilityHint={TEXT_HINT}
          accessibilityLabel={TEXT_LABEL}
          accessibilityRole={TEXT_ROLE}
          accessibilityStates={['selected']}
          accessibilityState={{ expanded: false, selected: true }}
          accessibilityValue={{ min: 40, max: 60 }}
        >
          {this.props.children}
        </Typography>
      </TouchableOpacity>
    );
  }
}

function Section() {
  return (
    <>
      <Typography
        accessibilityHint={TEXT_HINT}
        accessibilityLabel={TEXT_LABEL}
        accessibilityRole={TEXT_ROLE}
        // $FlowFixMe - removed in RN 0.62
        accessibilityStates={['selected', 'disabled']}
        accessibilityState={{ expanded: false }}
        accessibilityValue={{ max: 60 }}
      >
        Title
      </Typography>
      <Button>{TEXT_LABEL}</Button>
    </>
  );
}

test('getByA11yLabel, queryByA11yLabel', () => {
  const { getByA11yLabel, queryByA11yLabel } = render(<Section />);

  expect(getByA11yLabel(BUTTON_LABEL).props.accessibilityLabel).toEqual(
    BUTTON_LABEL
  );
  const button = queryByA11yLabel(/button/g);
  expect(button && button.props.accessibilityLabel).toEqual(BUTTON_LABEL);
  expect(() => getByA11yLabel(NO_MATCHES_TEXT)).toThrow(NO_INSTANCES_FOUND);
  expect(queryByA11yLabel(NO_MATCHES_TEXT)).toBeNull();

  expect(() => getByA11yLabel(TEXT_LABEL)).toThrow(FOUND_TWO_INSTANCES);
  expect(() => queryByA11yLabel(TEXT_LABEL)).toThrow(FOUND_TWO_INSTANCES);
});

test('getAllByA11yLabel, queryAllByA11yLabel', () => {
  const { getAllByA11yLabel, queryAllByA11yLabel } = render(<Section />);

  expect(getAllByA11yLabel(TEXT_LABEL)).toHaveLength(2);
  expect(queryAllByA11yLabel(/cool/g)).toHaveLength(3);
  expect(() => getAllByA11yLabel(NO_MATCHES_TEXT)).toThrow(NO_INSTANCES_FOUND);
  expect(queryAllByA11yLabel(NO_MATCHES_TEXT)).toEqual([]);
});

test('getByA11yHint, queryByA11yHint', () => {
  const { getByA11yHint, queryByA11yHint } = render(<Section />);

  expect(getByA11yHint(BUTTON_HINT).props.accessibilityHint).toEqual(
    BUTTON_HINT
  );
  const button = queryByA11yHint(/button/g);
  expect(button && button.props.accessibilityHint).toEqual(BUTTON_HINT);
  expect(() => getByA11yHint(NO_MATCHES_TEXT)).toThrow(NO_INSTANCES_FOUND);
  expect(queryByA11yHint(NO_MATCHES_TEXT)).toBeNull();

  expect(() => getByA11yHint(TEXT_HINT)).toThrow(FOUND_TWO_INSTANCES);
  expect(() => queryByA11yHint(TEXT_HINT)).toThrow(FOUND_TWO_INSTANCES);
});

test('getAllByA11yHint, queryAllByA11yHint', () => {
  const { getAllByA11yHint, queryAllByA11yHint } = render(<Section />);

  expect(getAllByA11yHint(TEXT_HINT)).toHaveLength(2);
  expect(queryAllByA11yHint(/static/g)).toHaveLength(2);
  expect(() => getAllByA11yHint(NO_MATCHES_TEXT)).toThrow(NO_INSTANCES_FOUND);
  expect(queryAllByA11yHint(NO_MATCHES_TEXT)).toEqual([]);
});

test('getByA11yRole, queryByA11yRole', () => {
  const { getByA11yRole, queryByA11yRole } = render(<Section />);

  expect(getByA11yRole('button').props.accessibilityRole).toEqual('button');
  const button = queryByA11yRole(/button/g);
  expect(button && button.props.accessibilityRole).toEqual('button');
  expect(() => getByA11yRole(NO_MATCHES_TEXT)).toThrow(NO_INSTANCES_FOUND);
  expect(queryByA11yRole(NO_MATCHES_TEXT)).toBeNull();

  expect(() => getByA11yRole('link')).toThrow(FOUND_TWO_INSTANCES);
  expect(() => queryByA11yRole('link')).toThrow(FOUND_TWO_INSTANCES);
});

test('getAllByA11yRole, queryAllByA11yRole', () => {
  const { getAllByA11yRole, queryAllByA11yRole } = render(<Section />);

  expect(getAllByA11yRole('link')).toHaveLength(2);
  expect(queryAllByA11yRole(/ink/g)).toHaveLength(2);
  expect(() => getAllByA11yRole(NO_MATCHES_TEXT)).toThrow(NO_INSTANCES_FOUND);
  expect(queryAllByA11yRole(NO_MATCHES_TEXT)).toEqual([]);
});

// TODO: accessibilityStates was removed from RN 0.62
test.skip('getByA11yStates, queryByA11yStates', () => {
  const { getByA11yStates, queryByA11yStates } = render(<Section />);

  expect(getByA11yStates('disabled').props.accessibilityStates).toEqual([
    'selected',
    'disabled',
  ]);
  const disabled = queryByA11yStates(['disabled']);
  expect(disabled && disabled.props.accessibilityStates).toMatchObject([
    'selected',
    'disabled',
  ]);
  const disabledSelected = queryByA11yStates(['selected', 'disabled']);
  expect(
    disabledSelected && disabledSelected.props.accessibilityStates
  ).toEqual(['selected', 'disabled']);

  expect(() => getByA11yStates(NO_MATCHES_TEXT)).toThrow(NO_INSTANCES_FOUND);
  expect(queryByA11yStates(NO_MATCHES_TEXT)).toBeNull();
  expect(queryByA11yStates([])).toBeNull();

  expect(() => getByA11yStates('selected')).toThrow(FOUND_TWO_INSTANCES);
  expect(() => queryByA11yStates('selected')).toThrow(FOUND_TWO_INSTANCES);
});

// TODO: accessibilityStates was removed from RN 0.62
test.skip('getAllByA11yStates, queryAllByA11yStates', () => {
  const { getAllByA11yStates, queryAllByA11yStates } = render(<Section />);

  expect(getAllByA11yStates('selected')).toHaveLength(3);
  expect(queryAllByA11yStates(['selected'])).toHaveLength(3);

  expect(() => getAllByA11yStates([])).toThrow(NO_INSTANCES_FOUND);
  expect(queryAllByA11yStates(NO_MATCHES_TEXT)).toEqual([]);
});

test('getByA11yState, queryByA11yState', () => {
  const { getByA11yState, queryByA11yState } = render(<Section />);

  expect(getByA11yState({ selected: true }).props.accessibilityState).toEqual({
    selected: true,
    expanded: false,
  });
  expect(
    queryByA11yState({ selected: true })?.props.accessibilityState
  ).toEqual({
    selected: true,
    expanded: false,
  });

  expect(() => getByA11yState({ disabled: true })).toThrow(NO_INSTANCES_FOUND);
  expect(queryByA11yState({ disabled: true })).toEqual(null);

  expect(() => getByA11yState({ expanded: false })).toThrow(
    FOUND_TWO_INSTANCES
  );
  expect(() => queryByA11yState({ expanded: false })).toThrow(
    FOUND_TWO_INSTANCES
  );
});

test('getAllByA11yState, queryAllByA11yState', () => {
  const { getAllByA11yState, queryAllByA11yState } = render(<Section />);

  expect(getAllByA11yState({ selected: true }).length).toEqual(1);
  expect(queryAllByA11yState({ selected: true }).length).toEqual(1);

  expect(() => getAllByA11yState({ disabled: true })).toThrow(
    NO_INSTANCES_FOUND
  );
  expect(queryAllByA11yState({ disabled: true })).toEqual([]);

  expect(getAllByA11yState({ expanded: false }).length).toEqual(2);
  expect(queryAllByA11yState({ expanded: false }).length).toEqual(2);
});

test('getByA11yValue, queryByA11yValue', () => {
  const { getByA11yValue, queryByA11yValue } = render(<Section />);

  expect(getByA11yValue({ min: 40 }).props.accessibilityValue).toEqual({
    min: 40,
    max: 60,
  });
  expect(queryByA11yValue({ min: 40 })?.props.accessibilityValue).toEqual({
    min: 40,
    max: 60,
  });

  expect(() => getByA11yValue({ min: 50 })).toThrow(NO_INSTANCES_FOUND);
  expect(queryByA11yValue({ min: 50 })).toEqual(null);

  expect(() => getByA11yValue({ max: 60 })).toThrow(FOUND_TWO_INSTANCES);
  expect(() => queryByA11yValue({ max: 60 })).toThrow(FOUND_TWO_INSTANCES);
});

test('getAllByA11yValue, queryAllByA11yValue', () => {
  const { getAllByA11yValue, queryAllByA11yValue } = render(<Section />);

  expect(getAllByA11yValue({ min: 40 }).length).toEqual(1);
  expect(queryAllByA11yValue({ min: 40 }).length).toEqual(1);

  expect(() => getAllByA11yValue({ min: 50 })).toThrow(NO_INSTANCES_FOUND);
  expect(queryAllByA11yValue({ min: 50 })).toEqual([]);

  expect(getAllByA11yValue({ max: 60 }).length).toEqual(2);
  expect(queryAllByA11yValue({ max: 60 }).length).toEqual(2);
});

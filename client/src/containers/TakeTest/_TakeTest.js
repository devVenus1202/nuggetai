import { TakeTest } from "./TakeTest";
import React from "react";
import StartTest from "../../components/Modals/StartTest";
import draftJs from "draft-js";
import { shallow, mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle
} from "react-accessible-accordion";

const loadAssesment = jest.fn();
const submitAssesment = jest.fn();
const configurePropsAndState = () => {
  const props = {
    match: {
      params: {
        testid: 1
      }
    },
    loadAssesment: loadAssesment,
    submitAssesment: submitAssesment
  };
  return {
    props
  };
};
describe("TakeTest", () => {
  it("Render TakeTest without errors", () => {
    const { props } = configurePropsAndState();
    const wrapper = mount(<TakeTest {...props} />);
  });

  it("testId null should render nothing to show", () => {
    const { props } = configurePropsAndState();
    props.match.params.testid = null;
    const wrapper = mount(<TakeTest {...props} />);
    expect(wrapper.text()).toEqual("Nothing to show");
  });

  it("StartTest should show prop should be boolean", () => {
    const { props } = configurePropsAndState();
    const wrapper = mount(<TakeTest {...props} />);
    const foundStartTest = wrapper.find(StartTest).first();

    expect(foundStartTest.props().show).toEqual(true);
  });
});
describe("TakeTest with Data", () => {
  const testDetails = {
    _id: "anyId1",
    details: {
      role: "3",
      level: 2,
      cards: [
        {
          name: "",
          desc: "",
          cardtype: 1
        }
      ],
      testName: "algo task",
      testDesc: "what is algorithms"
    },
    createdBy: 15
  };

  it("leftpane of test should render accordion", () => {
    const wrapper = shallow(
      <TakeTest
        match={{ params: { testid: 1 } }}
        testDetails={testDetails}
        loadAssesment={loadAssesment}
        submitAssesment={submitAssesment}
      />
    );
    console.log(wrapper);
    const accordionFound = wrapper.find(Accordion);
    expect(accordionFound).toHaveLength(1);
    const accordionItemFound = accordionFound.find(AccordionItem);
    expect(accordionItemFound).toHaveLength(2);
  });

  it("createNewSection", () => {
    const spyConvertFromHtml = jest.spyOn(draftJs, "convertFromHTML");
    const { props } = configurePropsAndState();
    props.testDetails = testDetails;
    const TakeTestInstance = new TakeTest(props);

    TakeTestInstance.createNewSection("Problem", "\n");
    expect(spyConvertFromHtml).toHaveBeenCalledTimes(1);

    const markup = spyConvertFromHtml.mock.calls[0][0];

    expect(TakeTestInstance.dummyState.sections).toContainEqual("Problem");
    spyConvertFromHtml.mockRestore();
  });

  it("createNewSection should be called on mount", () => {

    const wrapper = mount(
      <TakeTest
        match={{ params: { testid: 1 } }}
        testDetails={testDetails}
        loadAssesment={loadAssesment}
        submitAssesment={submitAssesment}
      />
    );
    expect(loadAssesment).toHaveBeenCalled();
    expect(wrapper.instance().dummyState.sections).toMatchSnapshot()
    
  });
});

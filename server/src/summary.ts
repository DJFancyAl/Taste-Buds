interface MemberSelection {
    member: string;
    selections: [{ type: string, name: string }];
  }

export const createSummary = (selections: MemberSelection[]) => {
    console.log(selections)
}
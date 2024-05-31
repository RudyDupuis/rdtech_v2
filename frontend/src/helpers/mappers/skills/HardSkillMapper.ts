import { GetHardSkill, PostHardSkill, PutHardSkill } from '@/entities/skills/HardSkill'

export interface HardSkillJson {
  id: string
  name: string
  svg_path: string
  mastery: 'advanced' | 'intermediate' | 'beginner'
}

export class HardSkillMapper {
  jsonToGetHardSkill(hardSkillJson: HardSkillJson) {
    return new GetHardSkill(
      hardSkillJson.id,
      hardSkillJson.name,
      hardSkillJson.svg_path,
      hardSkillJson.mastery
    )
  }

  getHardSkillToPutHardSkill(getHardSkill: GetHardSkill) {
    return new PutHardSkill(
      getHardSkill.id,
      getHardSkill.name,
      null,
      getHardSkill.svg_path,
      getHardSkill.mastery
    )
  }

  emptyPostHardSkill() {
    return new PostHardSkill('', null, 'beginner')
  }
}

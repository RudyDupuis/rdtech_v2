import { GetSoftSkill, PostSoftSkill, PutSoftSkill } from '@/entities/skills/SoftSkill'

export interface SoftSkillJson {
  id: string
  name: string
  svg_path: string
}

export class SoftSkillMapper {
  jsonToGetSoftSkill(softSkillJson: SoftSkillJson) {
    return new GetSoftSkill(softSkillJson.id, softSkillJson.name, softSkillJson.svg_path)
  }

  getSoftSkillToPutSoftSkill(getSoftSkill: GetSoftSkill) {
    return new PutSoftSkill(getSoftSkill.id, getSoftSkill.name, null, getSoftSkill.svg_path)
  }

  emptyPostSoftSkill() {
    return new PostSoftSkill('', null)
  }
}

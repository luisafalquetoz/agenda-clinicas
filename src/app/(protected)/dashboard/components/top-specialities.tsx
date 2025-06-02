import {
  Activity,
  Baby,
  Bone,
  Brain,
  Eye,
  Hand,
  Heart,
  Hospital,
  Stethoscope,
} from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TopSpecialitiesProps {
  topSpecialities: {
    speciality: string;
    appointments: number;
  }[];
}

const getSpecialityIcon = (speciality: string) => {
  const specialityLower = speciality.toLowerCase();

  if (specialityLower.includes("cardiolog")) return Heart;
  if (
    specialityLower.includes("ginecolog") ||
    specialityLower.includes("obstetri")
  )
    return Baby;
  if (specialityLower.includes("pediatr")) return Activity;
  if (specialityLower.includes("dermatolog")) return Hand;
  if (
    specialityLower.includes("ortoped") ||
    specialityLower.includes("traumatolog")
  )
    return Bone;
  if (specialityLower.includes("oftalmolog")) return Eye;
  if (specialityLower.includes("neurolog")) return Brain;

  return Stethoscope;
};

const TopSpecialities = ({ topSpecialities }: TopSpecialitiesProps) => {
  const maxAppointments = Math.max(
    ...topSpecialities.map((i) => i.appointments),
  );
  return (
    <Card className="mx-auto w-full">
      <CardContent>
        <div className="mb-4 flex items-center justify-between border-b-1 pb-4">
          <div className="flex items-center gap-3">
            <Hospital className="text-muted-foreground" />
            <CardTitle className="text-base">Especialidades</CardTitle>
          </div>
        </div>

        <div className="space-y-6">
          {topSpecialities.map((speciality) => {
            const Icon = getSpecialityIcon(speciality.speciality);
            // Porcentagem de ocupação da especialidade baseando-se no maior número de agendamentos
            const progressValue =
              (speciality.appointments / maxAppointments) * 100;

            return (
              <div
                key={speciality.speciality}
                className="flex items-center gap-2"
              >
                <div className="bg-primary/10 flex h-8 w-10 items-center justify-center rounded-full">
                  <Icon className="text-primary w-5 h-5" />
                </div>
                <div className="flex w-full flex-col justify-center">
                  <div className="flex w-full justify-between">
                    <h3 className="text-sm">{speciality.speciality}</h3>
                    <div className="text-right">
                      <span className="text-muted-foreground text-sm font-medium">
                        {speciality.appointments} agend.
                      </span>
                    </div>
                  </div>
                  <Progress value={progressValue} className="w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSpecialities;

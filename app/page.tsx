import { subtitle, title } from "@/components/primitives";
import { PadlockIcon } from "@/components/icons";
import { Spacer } from "@nextui-org/spacer";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Encryption with&nbsp;</h1>
        <h1 className={title({ color: "cyan" })}>WAU&nbsp;</h1>
        <Spacer y={6} />
        <div className="flex items-center justify-center">
          <PadlockIcon size={60} />
        </div>
      </div>

      <Spacer y={16} />

      <div className="flex gap-3">
        <Card className="w-[340px]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/TechCrunch_Disrupt_Europe_Berlin_2013_%2810536888854%29_%28cropped%29.jpg/640px-TechCrunch_Disrupt_Europe_Berlin_2013_%2810536888854%29_%28cropped%29.jpg"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Pavel Durov
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  CEO Telegram
                </h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 text-small text-default-400">
            <p>
              You know the interesting thing about encryption is that it cannot
              be secure just for some people.
            </p>
          </CardBody>
        </Card>
        <Spacer x={4} />
        <Card className="w-[340px]">
          <CardHeader className="justify-between ">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/John_McAfee_by_Gage_Skidmore.jpg/1024px-John_McAfee_by_Gage_Skidmore.jpg"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  John McAfee
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  CEO McAfee
                </h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <p>
              It's very hard to keep an uncrackable encryption if you share it
              with the government.
            </p>
          </CardBody>
        </Card>
        <Spacer x={4} />
        <Card className="w-[340px]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Official_portrait_of_Rt_Hon_Priti_Patel_MP_crop_2.jpg/1280px-Official_portrait_of_Rt_Hon_Priti_Patel_MP_crop_2.jpg"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Priti Patel
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  British Politician
                </h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <p>Strong encryption enables commerce and protects us online.</p>
          </CardBody>
        </Card>
      </div>

      <Spacer y={10} />

      <h1 className={title()}>Why us?</h1>
      <p>
        <span className="text-inherit text-2xl">Because we are </span>
        <span className="text-2xl" style={{ color: "cyan" }}>
          FREE
        </span>
        <span className="text-inherit text-2xl">, </span>
        <span className="text-2xl" style={{ color: "cyan" }}>
          FAST{" "}
        </span>
        <span className="text-inherit text-2xl">and </span>
        <span className="text-2xl" style={{ color: "cyan" }}>
          EASY
        </span>
      </p>

      <Divider className="mt-14 mb-20" />

      <h1 className={title()}>Our Team</h1>

      <div className="mt-8 flex gap-3">
        <Card className="py-4">
          <CardHeader className="overflow-visible py-0">
            <Image
              width={300}
              height={300}
              alt="Benjamin Bork"
              src="/benjamin.jpeg"
            />
          </CardHeader>
          <CardBody className="pb-0 pt-2 px-4 flex-col items-center">
            <h4 className="font-bold text-large">Benjamin Bork</h4>
            <p className="text-tiny uppercase font-bold">Founder</p>
            <small className="text-default-500">
              Coding & Software-engineering
            </small>
          </CardBody>
        </Card>

        <Spacer x={4} />

        <Card className="py-4">
          <CardHeader className="overflow-visible py-0">
            <Image
              width={300}
              height={300}
              alt="Danny Kukic"
              src="/danny.jpg"
            />
          </CardHeader>
          <CardBody className="pb-0 pt-2 px-4 flex-col items-center">
            <h4 className="font-bold text-large">Danny Kukic</h4>
            <p className="text-tiny uppercase font-bold">Founder</p>
            <small className="text-default-500">
              Coding & Software-engineering
            </small>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

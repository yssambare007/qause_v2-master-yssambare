import Head from "next/head";
interface Props {
  title: string;
  description: string;
  url: string;
  type?: string;
}
function SeoHeadComponent(props: Props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={props.url} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={props.type ?? "article"} />
      <meta property="og:site_name" content="Qause" />
      <meta
        property="og:image"
        content="https://qauseuat.s3.ap-south-1.amazonaws.com/static/no-logo.png"
      />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="576" />
      <meta property="robots" content="noindex,nofollow" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@qauseindia" />
      <meta name="twitter:site" content="@qauseindia" />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content="Muhammad Fareed" />
      <meta name="twitter:label2" content="Est. reating time" />
      <meta name="twitter:data2" content="5 minutes" />
    </Head>
  );
}

export default SeoHeadComponent;
